const { dialog } = require('electron').remote;
import * as fs from 'fs-extra';
import { join } from 'path';


export class DialogService {
    /**
     *
     * @param returnFiles flag to make the function return files in the folder
     */
    public async selectFolder(returnFiles?: boolean) {

        const path = await dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections']
        });

        if (path.canceled) return null;

        let folder = this.escape(path.filePaths[0]);

        return {
            folder: folder,
            files: returnFiles ? (await fs.readdir(folder)).map(file => this.escape(join(folder, file))) : undefined
        };

    }

    private escape = (path: string) => path.replace(/\\/g, '\\\\');

}

