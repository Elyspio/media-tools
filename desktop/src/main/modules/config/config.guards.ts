import { LocalConfig, LocalConfigV1 } from "@shared/config/app.config";

export const configGuards = {
	is: {
		v1: (conf: LocalConfig): conf is LocalConfigV1 => {
			return (conf as LocalConfigV1).version === 1;
		},
	},
};
