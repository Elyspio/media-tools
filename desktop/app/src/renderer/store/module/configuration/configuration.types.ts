import { Configuration } from "@services/configuration/configuration.service";

export interface ConfigurationRouter {
	current: Configuration;
	isWindowUnderSized: boolean;
}