import * as electron from "electron";
import * as path from "path";
import * as remote from "@electron/remote";
import { Configuration } from "@services/configuration/configuration.service";

export const configFolder = (electron.app || remote.app).getPath("userData");
export const configMainFile = path.join(configFolder, "settings.json");

console.log("Setings will be stored in file " + configMainFile);

export enum AppBoardShow {
	external = "external",
	internal = "internal",
	hidden = "hidden",
}

export const version = process.env.npm_package_version ?? remote.app.getVersion();

const isDev = process.env.NODE_ENV === "development";

export const defaultConfiguration: Configuration = {
	version,
	appboard: {
		show: [AppBoardShow.internal, AppBoardShow.external],
	},
	frame: {
		show: {
			resourceUtilization: false,
		},
		resize: {
			height: false,
			width: false,
		},
	},
	endpoints: {
		homeAssistant: "https://ha.elyspio.fr",
		api: isDev ? "https://localhost:4000" : "https://elyspio.fr/elytools/",
		hubs: {
			screenshare: isDev ? "ws://localhost:4000/ws/screen-share" : "wss://elyspio.fr/elytools/ws/screen-share",
		},
	},
};
