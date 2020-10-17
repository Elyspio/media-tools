import { spawn, SpawnOptions } from 'child_process';
import { platform } from 'os';

export const spawnAsync = async (command: string, options?: Partial<SpawnOptions> & { ignoreErrors?: number[], color?: boolean }) => {
    const child = spawn(`cmd.exe`, ['/c', `${command}`], { stdio: 'inherit', ...options,  });

    let data = '';
    let error = '';

    const exitCode: number = await new Promise((resolve) => {
        child.on('close', resolve);
    });

    if (exitCode !== 0 && (!options?.ignoreErrors || !options.ignoreErrors.includes(exitCode))) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }

    return data;
};

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
        await spawnAsync(command);
        return true;
    } catch (e) {
        return false;
    }

}
