import { Template } from './types';

export class RepositoryBuilder {

    private templates : Template[] = [];


    public use(template: Template) {
        this.templates.push(template);
    }


    public build(path: string) {

    }


}

