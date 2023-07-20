import { Feature, FeatureOptions } from "./types";
import { featureMap } from "../../../config/projects/projects";
import { github } from "../../../config/projects/projects.private";
import * as fs from "fs-extra";
import { ensureDir, writeFile } from "fs-extra";
import { promises as ofs } from "fs";
import * as path from "path";
import * as os from "os";
import { injectable } from "inversify";
import { GithubService } from "./github.service";
import { FilesService } from "../files/files.service";
import { container } from "../../di/di.container";

@injectable()
export class FeatureService {
	private services: { github: GithubService; files: FilesService };

	constructor() {
		this.services = {
			files: container.get(FilesService),
			github: container.get(GithubService),
		};
	}

	public async getAvailableFeature(): Promise<Feature[]> {
		const templates = await this.services.github.getTemplates();
		console.log("templates", templates);
		const features = new Set<Feature>();
		for (const t of templates) {
			for (const f of featureMap[t.id.toString()] ?? []) {
				features.add(f);
			}
		}
		return [...features];
	}

	public async get(feature: Feature, dist: string) {
		const templates = await this.services.github.getTemplates();
		const featured = Object.entries(featureMap).find(([id, f]) => f.some((ff) => ff === feature));

		if (featured) {
			const template = templates.find((t) => t.id.toString() === featured[0]);
			if (template) {
				await this.services.github.clone({ repo: template.name, owner: github.user, output: dist });
			}
		}

		if (feature.take.length > 0) {
			const files = await fs.readdir(dist);
			const willBeRemoved = files.filter((f) => !feature.take.includes(f));
			await this.services.files.deleteNodes(willBeRemoved.map((f) => ({ path: path.resolve(dist, f) })));
		}

		if (feature.options?.includes(FeatureOptions.wrap)) {
			const files = await fs.readdir(dist);
			await fs.mkdir(path.join(dist, feature.name));
			for (const file of files) {
				await fs.move(path.join(dist, file), path.join(dist, feature.name, file));
			}
		}

		return (await fs.readdir(dist)).map((x) => path.join(dist, x));
	}

	public async merge(src: string[], dist: string) {
		await ensureDir(dist);
		for (const folder of src) {
			const files = (await fs.readdir(folder)).map((x) => path.join(folder, x));
			for (const file of files) {
				const fileBasename = path.parse(file).base;
				if ((await fs.readdir(dist)).includes(fileBasename)) {
					await this.mergeFile(path.resolve(dist, fileBasename), file);
				} else {
					await fs.move(file, path.resolve(dist, fileBasename));
				}
			}
		}
		await Promise.all(src.map((f) => ofs.rmdir(f, { recursive: true })));
	}

	/**
	 * Merge into f1, f2 by adding its content
	 * @param f1
	 * @param f2
	 * @private
	 */
	private async mergeFile(f1: string, f2: string) {
		const content = (await fs.readFile(f1)) + os.EOL + (await fs.readFile(f2));
		const uniq = [...new Set(content.split(os.EOL))];
		return writeFile(f1, uniq.join(os.EOL));
	}
}
