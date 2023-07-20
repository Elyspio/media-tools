import { currentLoad, mem, processes } from "systeminformation";
import { exec as _exec } from "child_process";
import { promisify } from "util";
import { xml2js } from "xml-js";
import { NvidiaSmi } from "./types/nvidia";
import * as os from "os";
import { injectable } from "inversify";

const exec = promisify(_exec);

@injectable()
export class SystemService {
	private static _instance: SystemService = new SystemService();

	public static get instance() {
		return SystemService._instance;
	}

	public async cpuLoad(): Promise<number> {
		return (await currentLoad()).currentLoad;
	}

	public async memoryUsed(): Promise<{ total: number; current: number }> {
		const data = await mem();
		return {
			total: data.total / 1e9,
			current: data.used / 1e9,
		};
	}

	public async gpuLoad(): Promise<{ encode: number; decode: number; overall: number; memory: number }> {
		const xml = (await exec("nvidia-smi -x -q")).stdout;
		const data: NvidiaSmi = xml2js(xml, { compact: true }) as any;
		const use = data.nvidia_smi_log.gpu.utilization;
		const parse = (number: string) => Number.parseFloat(number.slice(0, -1));
		return {
			decode: parse(use.decoder_util._text),
			encode: parse(use.encoder_util._text),
			overall: parse(use.gpu_util._text),
			memory: parse(use.memory_util._text),
		};
	}

	public shutdown = () => exec("shutdown -s -t 0");

	public sleep = () => exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");

	public hibernate = () => exec("rundll32.exe powrprof.dll,SetSuspendState Hibernate");

	public lock = () => exec("rundll32.exe user32.dll,LockWorkStation");

	public async getDownloadFolder() {
		let folder;
		const platform = os.platform();

		if (platform === "win32") {
			const { stdout } = await exec('REG QUERY "HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders"');
			const nodes = stdout
				.split("\r\n")
				.map((x) =>
					x
						.trim()
						.split(" ")
						.filter((line) => line.length)
				)
				.filter((line) => line.length);

			const folder_array = nodes.find((n) => n[0] === "{7D83EE9B-2244-4E70-B1F5-5393042AF1E4}");
			if (folder_array) {
				folder = folder_array[2];
			}
		} else if (platform === "linux") {
			const { stdout } = await exec("xdg-user-dir DOWNLOAD");
			folder = stdout;
		}

		if (folder === undefined) {
			throw new Error("Could not find user's download folder");
		}

		return folder;
	}

	public async open(thing: string) {
		const platform = os.platform();
		try {
			switch (platform) {
				case "linux":
					await exec("xdg-open " + thing);
					break;

				case "win32":
					await exec("explorer.exe " + thing);
					break;
			}
		} catch (e) {}
	}

	public async isAppStarted(name: string) {
		const apps = await processes();
		return apps.list.some((app) => app.name.includes(name));
	}
}
