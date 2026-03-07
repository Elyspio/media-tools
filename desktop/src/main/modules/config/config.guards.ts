import { LocalConfig, LocalConfigV1, LocalConfigV2 } from "@shared/config/app.config";

export const configGuards = {
	is: {
		v1: (conf: LocalConfig): conf is LocalConfigV1 => {
			return conf.version === 1;
		},
		v2: (conf: LocalConfig): conf is LocalConfigV2 => {
			return conf.version === 2;
		},
	},
};
