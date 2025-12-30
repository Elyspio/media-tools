import { LogModule } from "../log.module";
import path from "path";
import * as fs from "node:fs";
import type { LatestConfig, LocalConfig } from "@shared/config/app.config";
import { MainContextModule } from "../context/main.context.module";
import { ConfigMigrationModule } from "./config.migration.module";
import { log } from "../../utils/logs.utils";
import { inject, injectable } from "inversify";

@injectable()
export class ConfigModule extends LogModule {
	#configFilePath?: string;
	private configCache: LatestConfig | undefined;

	public constructor(
		@inject(MainContextModule) private readonly mainContextModule: MainContextModule,
		@inject(ConfigMigrationModule) private readonly configMigrationModule: ConfigMigrationModule
	) {
		super("ConfigModule");
		const configFolder = path.dirname(this.configFilePath);
		if (!fs.existsSync(configFolder)) {
			fs.mkdirSync(configFolder, { recursive: true });
		}
	}

	private get configFilePath() {
		return (this.#configFilePath ??= path.resolve(this.mainContextModule.appFolder, "config", "config.json"));
	}

	@log.debug()
	public async writeConfig(config: LatestConfig) {
		this.configCache = config;
		await fs.promises.writeFile(this.configFilePath, JSON.stringify(config, null, 4));
	}

	@log.debug()
	public async getConfig(): Promise<LatestConfig> {
		if (this.configCache) {
			this.logger.debug("Returning cached config");
			return this.configCache;
		}

		if (!fs.existsSync(this.configFilePath)) {
			await this.writeConfig(await this.getDefaultConfig());
			return this.configCache!;
		}

		let config = await this.tryParse();

		if (this.configMigrationModule.requireMigration(config)) {
			config = await this.configMigrationModule.migrate(config);
			await this.writeConfig(config);
		}

		this.configCache = config;

		return this.configCache;
	}

	public async regenerateConfig() {
		this.configCache = await this.getDefaultConfig();

		await this.writeConfig(this.configCache);

		return this.configCache;
	}

	/**
	 * Si on n'arrive pas à parser la config, on la reset par sa valeur par défaut
	 * @private
	 */
	@log.debug()
	private async tryParse() {
		try {
			return JSON.parse(await fs.promises.readFile(this.configFilePath, "utf-8")) as LocalConfig;
		} catch (e) {
			this.logger.error("Failed to parse config", e);
			return this.getDefaultConfig();
		}
	}

	@log.debug()
	private async getDefaultConfig(): Promise<LatestConfig> {
		return {
			version: 1,
			windows: { position: {} },
			appboard: { show: [] },
			frame: {
				show: {
					resourceUtilization: true,
				},
				resize: {
					height: true,
					width: true,
				},
			},
			endpoints: {
				homeAssistant: "https://ha.elyspio.fr",
				api: "",
				hubs: {
					screenshare: "",
				},
			},
		};
	}
}
