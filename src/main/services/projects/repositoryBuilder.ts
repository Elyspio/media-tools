import { Feature } from './types';

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

    public build(path: string) {
        if(!this.config.github) throw new Error("No name provided, please set githubName property")
    }


}

