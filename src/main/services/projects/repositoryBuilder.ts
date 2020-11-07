import { Feature } from './types';
import { Services } from '../index';
import path from 'path';

export class RepositoryBuilder {

    private config: {
        github: string,
        description?: string,
        readme?: boolean,
        features: Feature[],
        docker?: string;
    } = {
        github: '',
        features: []
    };

    public use(feature: Feature) {
        this.config.features.push(feature);
    }

    public addReadme() {
        this.config.readme = true;
    }

    public set description(des: string) {
        this.config.description = des;
    }

    public set githubName(val: string) {
        this.config.github = val;
    }

    public set dockerName(val: string) {
        this.config.docker = val;
    }

    public async build(output: string) {
        if (!output) throw new Error('No output provided');
        if (!this.config.github) throw new Error('No name provided, please set githubName property');


        // features
        const getFeatures = this.config.features.map(f => Services.projects.feature.get(f, path.join(output, f.name)));
        const paths = this.config.features.map(f => path.join(output, f.name));
        await Promise.all(getFeatures);
        console.log('paths', paths);
        const projectPath = path.join(output, this.config.github);
        await Services.projects.feature.merge(paths, projectPath);

        // github
        await Services.projects.github.init(projectPath, this.config.github, this.config.description);


    }


}

