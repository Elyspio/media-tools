import { configGuards } from "./config.guards";
import { LogModule } from "../log.module";
import type { LatestConfig, LocalConfig, LocalConfigV1 } from "@shared/config/app.config";
import { log } from "../../utils/logs.utils";

/**
 * Module de migration de la configuration local
 */
export class ConfigMigrationModule extends LogModule {
	public constructor() {
		super("ConfigMigrationModule");
	}

	/**
	 * Migre la configuration locale vers la dernière version
	 * @param conf
	 */
	@log.debug()
	public async migrate(conf: LocalConfig): Promise<LatestConfig> {
		this.logger.info("Starting migration of local config");

		return conf;
	}

	/**
	 * Indique si la configuration locale nécessite une migration
	 * @param conf
	 */
	@log.debug((conf: LocalConfigV1) => `version=${conf.version}`)
	public requireMigration(conf: LocalConfig): conf is LatestConfig {
		return !configGuards.is.v1(conf);
	}
}
