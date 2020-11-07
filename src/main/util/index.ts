import { spawn, SpawnOptions } from 'child_process';
import { platform } from 'os';



export const spawnBinary = async (binary: string, param: string[], folder: string, log?: boolean) => {
    const child = spawn(binary, param, {cwd: folder});
    child.stdout.on('data', (data) => {
        if(log) console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
        if(log)  console.log(`stderr: ${data}`);
    });

    return await new Promise((resolve) => {
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve()
        });
    });
}

export const spawnAsync = async (command: string, options?: Partial<SpawnOptions> & { ignoreErrors?: boolean, color?: boolean }) => {
    const child = spawn(`cmd.exe`, ['/c', ...command.split(" ")], { stdio: 'inherit', ...options,  });

    // @ts-ignore
    child.stdout.on('data', (data) => {
        console.log(`stdout: ${data.toString()}`);
    });

    // @ts-ignore
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data.toString()}`);
    });

    const exitCode: number = await new Promise((resolve) => {
        child.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            child.on('close', resolve);
        });
    });


    // @ts-ignore
    if (exitCode !== 0 && (!options?.ignoreErrors)) {
        throw new Error(`subprocess error exit ${exitCode} for command ${command}`);
    }

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
