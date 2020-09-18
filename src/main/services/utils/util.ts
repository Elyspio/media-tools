import * as util from 'util';
import * as child_process from 'child_process';
import { platform } from 'os';

export namespace Utils {
    export async function isInstalled(app: string) {

        let command = '';
        switch (platform()) {
            case 'win32':
                command = `where ${app}`;
                break;
            case 'linux':
                command = `which ${app}`;
                break;
        }

        try {
            await exec(command);
            return true;
        } catch (e: any) {
            return false;
        }

    }


    export const exec = util.promisify(child_process.exec);
}


