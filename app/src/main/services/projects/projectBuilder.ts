import { Feature } from "./types";
import * as path from "path";
import * as fs from "fs-extra";
import { EOL } from "os";
import { FeatureService } from "./feature.service";
import { injectable } from "inversify";
import { GithubService } from "./github.service";
import { DockerService } from "./docker.service";
import { FilesService } from "../files/files.service";
import { container } from "../../di/di.container";

@injectable()
export class ProjectBuilder {
	private services: { github: GithubService; feature: FeatureService; files: FilesService; docker: DockerService };
	private config: {
		name: string;
		github?: string;
		description?: string;
		readme?: boolean;
		features: Feature[];
		docker?: string;
		template?: boolean;
	} = {
		name: "",
		features: [],
	};

	public constructor() {
		this.services = {
			files: container.get(FilesService),
			docker: container.get(DockerService),
			github: container.get(GithubService),
			feature: container.get(FeatureService),
		};
	}

	public set description(des: string) {
		this.config.description = des;
	}

	public set name(name: string) {
		this.config.name = name;
	}

	public set github(val: string) {
		this.config.github = val;
	}

	public set docker(val: string) {
		this.config.docker = val;
	}

	public use(feature: Feature) {
		this.config.features.push(feature);
	}

	public addReadme() {
		this.config.readme = true;
	}

	public async build(output: string) {
		if (!output) throw new Error("No output provided");

		//

		const getFeatures = this.config.features.map(f => this.services.feature.get(f, path.join(output, f.name)));
		const paths = this.config.features.map(f => path.join(output, f.name));
		await Promise.all(getFeatures);
		const projectPath = path.join(output, this.config.name);
		await this.services.feature.merge(paths, projectPath);

		// readme
		if (this.config.readme) {
			const content = [
				"# " + this.config.github,
				"",
				"Bootstrapped with [Elytools](https://github.com/elyspio/media-tools) project",
				"",
				...(this.config.features.length ? ["Features included: ", ...this.config.features.map(f => `- ${f.name}`), ""] : []),
				"",
				this.config.description,
			];
			await fs.writeFile(path.join(projectPath, "readme.md"), content.join(EOL));
		}

		// github
		if (this.config.github && !(await this.services.github.exist(this.config.github))) {
			await this.services.github.init(projectPath, this.config.github, this.config.description, this.config.template);
		}

		// docker
		if (this.config.docker) {
			await this.services.docker.addDockerSupport(this.config.docker, this.config.description ?? "", this.config.features, projectPath);
		}

		await this.updateTemplate(projectPath);
	}

	isTemplate() {
		this.config.template = true;
	}

	private async updateTemplate(folder: string) {
		const files = await this.services.files.find(folder, { match: /.git/g, inverse: true });
		let name = typeof this.config.docker === "string" ? this.config.docker : this.config.name;
		await Promise.all(files.map(async file => await this.services.files.replaceInFile(file, "express-react-ts-template", name)));
	}
}
