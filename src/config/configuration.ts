import * as electron from 'electron';
import * as path from 'path';
import { Configuration } from '../main/services/configuration/configurationService';
export const configFolder = (electron.app || electron.remote.app).getPath('userData');
export const configMainFile = path.join(configFolder, "settings.json");

export const defaultConfiguration: Configuration = {
    appboard: {
        show: ["internal", 'external']
    }
}
