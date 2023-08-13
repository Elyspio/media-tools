import { AppBoardShow, configMainFile, defaultConfiguration, version } from "@/config/configuration";
import { setConfig } from "@modules/configuration/configuration.action";
import { inject, injectable } from "inversify";
import fs from "fs/promises";
import { readFileSync, writeFileSync } from "fs";
import { FilesService } from "@services/files/files.service";

export interface Configuration {
	version: string;
	appboard: {
		show: AppBoardShow[];
	};
	frame: {
		show: {
			resourceUtilization: boolean;
		};
		resize: {
			height: boolean;
			width: boolean;
		};
	};
	endpoints: {
		homeAssistant: string;
	};
}

@injectable()
export class ConfigurationService {

	@inject(FilesService)
	filesService!: FilesService;

	private mergeConfig(obj: Configuration) {
		const runningVersion = version;
		if (runningVersion !== obj.version) {
			console.log("Configuration file are outdated, merging with default config");
			obj = {
				...defaultConfiguration,
				...obj,
				version: runningVersion,
			};
		}
		return obj;
	}

	public get(async = true): Promise<Configuration> | Configuration {
		if (async) {
			return (async () => {
				if (!(await this.filesService.checkPathExists(configMainFile))) {
					await this.set(defaultConfiguration);
				}
				let obj: Configuration = defaultConfiguration;
				try {
					const str = await fs.readFile(configMainFile).then((x) => x.toString());
					obj = JSON.parse(str);
				} catch {
					// ignore
				}
				return this.mergeConfig(obj);
			})();
		} else {
			if (!this.filesService.checkPathExists(configMainFile)) {
				this.set(defaultConfiguration, false);
			}


			let obj: Configuration = defaultConfiguration;
			try {
				const str = readFileSync(configMainFile).toString();
				obj = JSON.parse(str);
			} catch {
				// ignore
			}

			return this.mergeConfig(obj);
		}
	}

	public set(config: Configuration, async = true) {
		if (async) {
			return fs.writeFile(configMainFile, JSON.stringify(config));
		} else {
			return writeFileSync(configMainFile, JSON.stringify(config));
		}
	}

	public async regenerate() {
		await fs.writeFile(configMainFile, JSON.stringify(defaultConfiguration));
		window.store.dispatch(setConfig(defaultConfiguration));
	}
}
