import {Feature} from "./types";

import * as path from "path";
import * as fs from "fs-extra";
import {EOL} from "os";
import {FeatureService} from "./feature.service";
import {inject} from "inversify";
import {GithubService} from "./github.service";
import {DockerService} from "./docker.service";
import {DependencyInjectionKeys} from "../dependency-injection/dependency-injection.keys";


export class ProjectBuilder {

	@inject(DependencyInjectionKeys.projects.feature)
	private featureService!: FeatureService

	@inject(DependencyInjectionKeys.projects.docker)
	private dockerService!: DockerService

	@inject(DependencyInjectionKeys.projects.github)
	private githubService!: GithubService

	private config: {
		name: string,
		github?: string,
		description?: string,
		readme?: boolean,
		features: Feature[],
		docker?: string;
		template?: boolean,
	} = {
		name: "",
		features: []
	};

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

		// features
		const getFeatures = this.config.features.map(f => this.featureService.get(f, path.join(output, f.name)));
		const paths = this.config.features.map(f => path.join(output, f.name));
		await Promise.all(getFeatures);
		const projectPath = path.join(output, this.config.name);
		await this.featureService.merge(paths, projectPath);

		// readme
		if (this.config.readme) {
			const content = [
				"# " + this.config.github,
				"",
				"Bootstrapped with [media-tools](https://github.com/Elyspio/media-tools) project",
				"",
				...(this.config.features.length ? [
					"Features included: ",
					...this.config.features.map(f => `- ${f.name}`),
					""] : []),
				"",
				this.config.description
			];
			await fs.writeFile(path.join(projectPath, "readme.md"), content.join(EOL));
		}

		// github
		if (this.config.github) {
			await this.githubService.init(projectPath, this.config.github, this.config.description, this.config.template);
		}

		// docker
		if (this.config.docker) {
			await this.dockerService.addDockerSupport(this.config.docker, this.config.description ?? "", this.config.features, projectPath);
		}


	}


	isTemplate() {
		this.config.template = true;
	}
}

