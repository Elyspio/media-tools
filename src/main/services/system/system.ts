import {currentLoad, mem} from "systeminformation"
import {exec as _exec} from "child_process"
import {promisify} from "util"
import {xml2js} from "xml-js"
import {NvidiaSmi} from "./types/nvidia";
const exec = promisify(_exec);

export class SystemService {

    private static _instance: SystemService = new SystemService();

    public static get instance() {return SystemService._instance}

    public async cpuLoad(): Promise<number> {
        return (await currentLoad()).currentload;
    }

    public async memoryUsed(): Promise<{total: number, current: number}> {
        const data = (await mem());
        return {
            total: data.total / 1e9,
            current: data.used / 1e9
        }
    }

    public async gpuLoad(): Promise<number> {
        let xml = (await exec("nvidia-smi -x -q")).stdout;
        const data: NvidiaSmi = xml2js(xml, {compact: true}) as any;
        return Number.parseFloat(data.nvidia_smi_log.gpu.utilization.gpu_util._text.slice(0, -1));
    }
}
