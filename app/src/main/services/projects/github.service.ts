import { Octokit } from "@octokit/rest";
import { Repository, Template } from "./types";
import * as path from "path";
import * as fs from "fs-extra";
import { github as githubConf } from "../../../config/projects/projects.private";
import { injectable } from "inversify";
import { FilesService } from "../files/files.service";
import { container } from "../dependency-injection/dependency-injection.container";
import { ProcessService } from "../common/process.service";

const github = new Octokit({
	log: {
		debug: console.debug,
		error: console.error,
		info: console.info,
		warn: console.warn,
	},
	auth: githubConf.token,
	userAgent: "appName",
	previews: ["baptiste-preview"],
});

@injectable()
export class GithubService {
	private services: { files: FilesService; process: ProcessService };

	constructor() {
		this.services = {
			files: container.get(FilesService),
			process: container.get(ProcessService),
		};
	}

	public async getTemplates(username?: string): Promise<Template[]> {
		const func = username
			? () =>
					github.repos.listForUser({
						username: username,
						per_page: 1000,
					})
			: () => github.repos.listForAuthenticatedUser({ per_page: 1000 });
		// @ts-ignore
		const { data }: { data: Repository[] } = await func();
		return data.filter(x => x.is_template).sort((x, y) => x.full_name.localeCompare(y.full_name)) as Template[];
	}

	public async clone(options: { owner: string; repo: string; output: string }) {
		// @ts-ignore
		const { data }: { data: ArrayBuffer } = await github.repos.downloadZipballArchive({
			ref: "master",
			repo: options.repo,
			owner: options.owner,
			archive_format: "zipball",
		});
		await this.services.files.unzip(data, path.resolve(__dirname, options.output));
		const innerDir = await fs.readdir(options.output);
		await this.services.files.moveContent(path.join(options.output, innerDir[0]), options.output);
	}

	/**
	 * @return the url of the remote
	 * @param folder
	 * @param name
	 * @param description
	 * @param isTemplate
	 */
	public async init(folder: string, name: string, description?: string, isTemplate?: boolean) {
		const info = await github.repos.createForAuthenticatedUser({ name, description, is_template: isTemplate });
		await this.services.process.spawnBinary("git", ["init"], folder);
		await this.services.process.spawnBinary("git", ["add", "."], folder);
		await this.services.process.spawnBinary("git", ["commit", "-m", "Initial commit"], folder);
		await this.services.process.spawnBinary("git", ["remote", "add", "origin", info.data.html_url], folder);
		await this.services.process.spawnBinary("git", ["push", "--set-upstream", "origin", "master"], folder);
		return info.data.html_url;
	}

	public async exist(name: string) {
		const { data } = await github.repos.listForAuthenticatedUser();
		return data.some(d => d.name === name);
	}
}
