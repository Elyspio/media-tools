import { remote } from 'electron';
import axios from 'axios';
import * as config from '../../config/update';
import { app_name } from '../../config/update';
import { platform } from 'os';
import { writeFile } from 'fs-extra';
import * as path from 'path';
import { spawnAsync } from './index';
import { store } from '../../renderer/store';
import { setDownloadPercentage } from '../../renderer/store/module/updater/action';
import { setCurrent } from '../../renderer/store/module/components/action';

const { app, dialog } = remote;


const getVersion = (): 'windows' | 'linux' | undefined => {
    let plat: any;
    if (platform() === 'win32') plat = 'windows';
    else if (platform() === 'linux') plat = 'linux';
    return plat;
};


export async function checkUpdate() {

    const version = process.env.NODE_ENV === 'production'
        ? app.getVersion()
        : process.env.npm_package_version as string;

    const plat = getVersion();


    const call = await axios.get(`${config.updateServer}${config.app_name}/${plat}/version/`);

    const current = version.split('.').map(x => parseInt(x));
    const server = call.data.split('.').map((x: string) => parseInt(x));


    if (true || server[0] > current[0] || server[1] > current[1] || server[2] > current[2]) {

        const response = await dialog.showMessageBox({ title: 'Update', message: 'A new version is available', buttons: ['Download', 'Cancel'] });

        if (response.response === 0) {
            store.dispatch(setCurrent("Updater"))
            const installerPath = await downloadUpdate();

            const response = await dialog.showMessageBox({ title: 'Update', message: 'Application is ready to update', buttons: ['Install', 'Cancel'] });
            if (response.response === 0) {
                await installUpdate(installerPath);
            }


        } else {
            console.debug('User does not want to update');
        }
    } else {
        console.debug('You are running on the latest version');
    }


}


export async function downloadUpdate() {
    const plat = getVersion();
    const bin = await axios.get(`${config.updateServer}${config.app_name}/${plat}`, {
        responseType: 'arraybuffer',
        onDownloadProgress: progressEvent => {
            store.dispatch(setDownloadPercentage(progressEvent.loaded * 100 / progressEvent.total))
        }
    });
    const p = path.join(process.env.USERPROFILE as string, 'temp', app_name + '.exe');
    await writeFile(p, bin);
    return p;
}


async function installUpdate(installerPath: string) {
    const filename = path.basename(installerPath);
    const dir = path.dirname(filename);
    await spawnAsync(filename, { stdio: 'inherit', detached: true, cwd: dir });
    app.quit();
}
