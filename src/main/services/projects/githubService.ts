import { Octokit } from '@octokit/rest';
import { Repository, Template } from './types';
import { Services } from '../index';
import * as path from 'path';
import * as fs from 'fs-extra';
import { github as githubConf } from '../../../config/projects.private';
import {execSync} from "child_process"
import simpleGit, { SimpleGit } from 'simple-git';




const github = new Octokit({
    log: {
        debug: console.debug,
        error: console.error,
        info: console.info,
        warn: console.warn
    },
    auth: githubConf.token,
    userAgent: 'appName',
    previews: ['baptiste-preview']
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
        const { data }: { data: ArrayBuffer } = await github.repos.downloadArchive({ ref: 'master', repo: options.repo, owner: options.owner, archive_format: 'zipball' });
        await Services.files.unzip(data, path.resolve(__dirname, options.output));
        const innerDir = await fs.readdir(options.output);
        await Services.files.moveContent(path.join(options.output, innerDir[0]), options.output);
    }

    public async init(folder: string, name: string, description?: string) {
        const git: SimpleGit = simpleGit(folder);
        console.log(1);
        await git.init();
        console.log(12);
        const info = await github.repos.createForAuthenticatedUser({ name, description });
        console.log(13);
        await git.addRemote("origin", info.data.html_url);
        console.log(14);
        await git.add(".");
        console.log(15);
        await git.commit("Initial commit");
        console.log(16);
        //await git.raw(["push", "--set-upstream", "origin", "master"]);
        await execSync("git push --set-upstream origin master")
        console.log(17);
    }
}
