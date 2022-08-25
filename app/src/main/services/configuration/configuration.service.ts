import * as fs from "fs-extra";
import { AppBoardShow, configMainFile, defaultConfiguration, version } from "../../../config/configuration";
import { setConfig } from "../../../renderer/store/module/configuration/configuration.action";
import { injectable } from "inversify";

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
	private static mergeConfig(obj: Configuration) {
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
			return new Promise(async resolve => {
				if (!(await fs.pathExists(configMainFile))) {
					await this.set(defaultConfiguration);
				}
				const str = await fs.readFile(configMainFile).then(x => x.toString());
				let obj: Configuration = JSON.parse(str);
				resolve(ConfigurationService.mergeConfig(obj));
			});
		} else {
			if (!fs.pathExistsSync(configMainFile)) {
				this.set(defaultConfiguration, false);
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

	public async regenerate() {
		const { store } = await import("../../../renderer/store");
		await fs.writeFile(configMainFile, JSON.stringify(defaultConfiguration));
		store.dispatch(setConfig(defaultConfiguration));
	}
}
