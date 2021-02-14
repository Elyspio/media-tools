import { BrowserWindowConstructorOptions } from "electron";

export const windowOption: BrowserWindowConstructorOptions = {
	width: 800,
	height: 600,
	webPreferences: {
		nodeIntegration: true,
		enableRemoteModule: true,
		webSecurity: false
	},
	hasShadow: true,
	frame: false,
	resizable: true


};

export const appName = "media-tools";
