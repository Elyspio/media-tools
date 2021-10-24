import * as electron from "electron";
import * as path from "path";
import * as remote from "@electron/remote";
import { Configuration } from "../main/services/configuration/configuration.service";

export const configFolder = (electron.app || remote.app).getPath("userData");
export const configMainFile = path.join(configFolder, "settings.json");

console.log("Setings will be stored in file " + configMainFile);

export const defaultConfiguration: Configuration = {
	version: "",
	appboard: {
		show: ["internal", "external"]
	},
	frame: {
		show: {
			resourceUtilization: false
		},
		resize: {
			height: false,
			width: false
		}
	},
	endpoints: {
		lightManager: "https://elyspio.fr/light-manager/",
		homeAssistant: "https://ha.elyspio.fr"
	}
};
