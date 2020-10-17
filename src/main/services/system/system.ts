import { currentLoad, mem } from 'systeminformation';
import { exec as _exec } from 'child_process';
import { promisify } from 'util';
import { xml2js } from 'xml-js';
import { NvidiaSmi } from './types/nvidia';

const exec = promisify(_exec);

export class SystemService {

    private static _instance: SystemService = new SystemService();

    public static get instance() {
        return SystemService._instance;
    }

    public async cpuLoad(): Promise<number> {
        return (await currentLoad()).currentload;
    }

    public async memoryUsed(): Promise<{ total: number, current: number }> {
        const data = (await mem());
        return {
            total: data.total / 1e9,
            current: data.used / 1e9
        };
    }

    public async gpuLoad(): Promise<{ encode: number, decode: number, overall: number, memory: number }> {
        let xml = (await exec('nvidia-smi -x -q')).stdout;
        const data: NvidiaSmi = xml2js(xml, { compact: true }) as any;
        const use = data.nvidia_smi_log.gpu.utilization;
        const parse = (number: string) => Number.parseFloat(number.slice(0, -1));
        return {
            decode: parse(use.decoder_util._text),
            encode: parse(use.encoder_util._text),
            overall: parse(use.gpu_util._text),
            memory: parse(use.memory_util._text)
        };
    }


    public shutdown = () => exec("shutdown -s -t 0");

    public sleep = () => exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");

    public hibernate = () => exec("rundll32.exe powrprof.dll,SetSuspendState Hibernate");

    public lock = () => exec("rundll32.exe user32.dll,LockWorkStation");


}
