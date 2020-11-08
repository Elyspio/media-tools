import * as fs from "fs-extra";
import { configMainFile, defaultConfiguration } from "../../../config/configuration";
import { remote } from "electron";


export const BaseConfig = {
	appboard: {
		show: ["external", "internal", "hidden"] as const
	}

};


export interface Configuration {
	version: string,
	appboard: {
		show: typeof BaseConfig["appboard"]["show"][number][]
	},
	frame: {
		show: {
			resourceUtilization: boolean
		}
	}
}


export class ConfigurationService {

	private static mergeConfig(obj: Configuration) {
		const runningVersion = remote.app.getVersion();
		if (runningVersion !== obj.version) {
			console.log("Configuration file are outdated, merging with default config");
			obj = {
				...defaultConfiguration,
				...obj,
				version: runningVersion
			};
		}
		return obj;
	}

	public get(async = true): Promise<Configuration> | Configuration {

		if (async) {
			return new Promise(async () => {
				if (!await fs.pathExists(configMainFile)) {
					await this.set(defaultConfiguration);
				}
				const str = await fs.readFile(configMainFile).then(x => x.toString());
				let obj: Configuration = JSON.parse(str);
				return ConfigurationService.mergeConfig(obj);
			});
		} else {
			if (!fs.pathExistsSync(configMainFile)) {
				this.set(defaultConfiguration, true);
			}
			const str = fs.readFileSync(configMainFile).toString();
			const obj: Configuration = JSON.parse(str);
			return ConfigurationService.mergeConfig(obj);

		}
	}

	public set(config: Configuration, async = true) {
		if (async) {
			return fs.writeFile(configMainFile, JSON.stringify(config));
		} else {
			return fs.writeFileSync(configMainFile, JSON.stringify(config));
		}
	}
}
