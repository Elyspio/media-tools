import { Feature, FeatureOptions } from "./types";
import { Services } from "../index";
import { featureMap } from "../../../config/projects";
import { github } from "../../../config/projects.private";
import * as fs from "fs-extra";
import { ensureDir, writeFile } from "fs-extra";
import { promises as ofs } from "fs";
import * as  path from "path";
import * as os from "os";


export class FeatureService {
	public async getAvailableFeature(): Promise<Feature[]> {
		const templates = await Services.projects.github.getTemplates();
		console.log("templates", templates);
		const features = new Set<Feature>();
		for (const t of templates) {
			for (const f of (featureMap[t.id.toString()] ?? [])) {
				features.add(f);
			}
		}
		return [...features];
	}

	public async get(feature: Feature, dist: string) {
		const templates = await Services.projects.github.getTemplates();
		const featured = Object.entries(featureMap).find(([id, f]) => f.some(ff => ff === feature));

		if (featured) {
			const template = templates.find(t => t.id.toString() === featured[0]);
			if (template) {
				await Services.projects.github.clone({ repo: template.name, owner: github.user, output: dist });
			}
		}

		if (feature.use.length > 0) {
			const files = await fs.readdir(dist);
			const willBeRemoved = files.filter(f => !feature.use.includes(f));
			await Services.files.deleteNodes(willBeRemoved.map(f => ({ path: path.resolve(dist, f) })));
		}

		if (feature.options?.includes(FeatureOptions.wrap)) {
			const files = await fs.readdir(dist);
			await fs.mkdir(path.join(dist, feature.name));
			for (let file of files) {
				await fs.move(path.join(dist, file), path.join(dist, feature.name, file));
			}
		}

		return (await fs.readdir(dist)).map(x => path.join(dist, x));
	}

	public async merge(src: string[], dist: string) {
		await ensureDir(dist);
		for (let folder of src) {
			const files = (await fs.readdir(folder)).map(x => path.join(folder, x));
			for (let file of files) {
				const fileBasename = path.parse(file).base;
				if ((await fs.readdir(dist)).includes(fileBasename)) {
					await this.mergeFile(path.resolve(dist, fileBasename), file);
				} else {
					await fs.move(file, path.resolve(dist, fileBasename));
				}
			}

		}
		await Promise.all(src.map(f => ofs.rmdir(f, { recursive: true })));
	}

	/**
	 * Merge into f1, f2 by adding its content
	 * @param f1
	 * @param f2
	 * @private
	 */
	private async mergeFile(f1: string, f2: string) {
		let content = await fs.readFile(f1) + os.EOL + await fs.readFile(f2);
		return writeFile(f1, content);
	}

}
