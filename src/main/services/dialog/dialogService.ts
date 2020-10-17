import { BrowserWindowConstructorOptions } from 'electron';
import * as fs from 'fs-extra';
import path, { join } from 'path';
import url from 'url';
import { windowOption } from '../../../config/main';

const { dialog, BrowserWindow } = require('electron').remote;


export class DialogService {
    /**
     *
     * @param returnFiles flag to make the function return files in the folder
     */
    public async selectFolder(returnFiles?: boolean) {

        const path = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });

        if (path.canceled) return null;

        let folder = this.escape(path.filePaths[0]);

        return {
            folder: folder,
            files: returnFiles ? (await fs.readdir(folder)).map(file => this.escape(join(folder, file))) : undefined
        };

    }

    public async createWindow(target: string, option?: Partial<BrowserWindowConstructorOptions>) {
        const win = new BrowserWindow({
            ...windowOption,
            ...option
        });

        const search = `route=${target}`;
        if (process.env.NODE_ENV !== 'production') {
            process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // eslint-disable-line require-atomic-updates
            return win.loadURL(`http://localhost:2003/?${search}`);
        } else {
            return win.loadURL(
                url.format({
                    pathname: path.join(__dirname, 'index.html'),
                    protocol: 'file:',
                    query: search,
                    slashes: true
                })
            );
        }

    }

    private escape = (path: string) => path.replace(/\\/g, '\\\\');


}

