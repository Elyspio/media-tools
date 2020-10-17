import * as fs from 'fs-extra';
import { configMainFile, defaultConfiguration } from '../../../config/configuration';


export const AppboardVisibityValues = {
    appboard: {
        show: ['external', 'internal', 'hidden'] as const
    }
};

export type AppboardVisibity = 'external' | 'internal' | 'hidden';


export interface Configuration {
    appboard: {
        show: AppboardVisibity[]
    }
}


export class ConfigurationService {

    public get(async = true): Promise<Configuration> | Configuration {

        if (async) {
            return new Promise(async () => {
                if (!await fs.pathExists(configMainFile)) {
                    await this.set(defaultConfiguration);
                }
                const str = await fs.readFile(configMainFile).then(x => x.toString());
                return JSON.parse(str);
            });
        } else {
            if (!fs.pathExistsSync(configMainFile)) {
                this.set(defaultConfiguration, true);
            }
            const str = fs.readFileSync(configMainFile).toString();
            return JSON.parse(str);
        }


    }

    public set(config: Configuration, async = true) {
        if (async) {
            return fs.writeFile(configMainFile, JSON.stringify(config));
        } else {
            return fs.writeFileSync(configMainFile, JSON.stringify(config));
        }
    }
}
