import { Octokit } from '@octokit/rest';
import { Repository, Template } from './types';
import { Services } from '../index';
import * as path from 'path';

const github = new Octokit({
    log: {
        debug: console.debug,
        error: console.error,
        info: console.info,
        warn: console.warn
    },
    auth: '51dbb84586c1201a6611258620b228dcfa5c035d',
    userAgent: 'appName',
    previews: ['baptiste-preview']
});


export class GithubService {

    public async getTemplates(username?: string): Promise<Template[]> {
        const func = username ? () => github.repos.listForUser({ username: username}) : () => github.repos.listForAuthenticatedUser();
        const { data }: { data: Repository[] } = await func();
        return data.filter(x => x.is_template).sort((x, y) => x.full_name.localeCompare(y.full_name)) as Template[];
    }

    public async clone(options: { owner: string, repo: string, output: string }) {
        const {data}: {data: ArrayBuffer }  = await github.repos.downloadArchive({ owner: options.owner, repo: options.repo, archive_format: 'zipball', ref: 'master' });

        await Services.files.unzip(data, path.resolve(__dirname, "aze"));
    }


}
