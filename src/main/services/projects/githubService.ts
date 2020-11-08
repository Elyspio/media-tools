import { Octokit } from "@octokit/rest";
import { Repository, Template } from "./types";
import { Services } from "../index";
import * as path from "path";
import * as fs from "fs-extra";
import { github as githubConf } from "../../../config/projects.private";
import { spawnBinary } from "../../util";


const github = new Octokit({
	log: {
		debug: console.debug,
		error: console.error,
		info: console.info,
		warn: console.warn
	},
	auth: githubConf.token,
	userAgent: "appName",
	previews: ["baptiste-preview"]
});


export class GithubService {

	constructor(private log?: boolean) {
	}

	public async getTemplates(username?: string): Promise<Template[]> {
		const func = username ? () => github.repos.listForUser({ username: username, per_page: 1000 }) : () => github.repos.listForAuthenticatedUser({ per_page: 1000 });
		const { data }: { data: Repository[] } = await func();
		return data.filter(x => x.is_template).sort((x, y) => x.full_name.localeCompare(y.full_name)) as Template[];
	}

	public async clone(options: { owner: string, repo: string, output: string }) {
		const { data }: { data: ArrayBuffer } = await github.repos.downloadArchive({ ref: "master", repo: options.repo, owner: options.owner, archive_format: "zipball" });
		await Services.files.unzip(data, path.resolve(__dirname, options.output));
		const innerDir = await fs.readdir(options.output);
		await Services.files.moveContent(path.join(options.output, innerDir[0]), options.output);
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
		await spawnBinary("git", ["init"], folder);
		await spawnBinary("git", ["add", "."], folder);
		await spawnBinary("git", ["commit", "-m", "Initial commit"], folder);
		await spawnBinary("git", ["remote", "add", "origin", info.data.html_url], folder);
		await spawnBinary("git", ["push", "--set-upstream", "origin", "master"], folder);
		return info.data.html_url;
	}
}
