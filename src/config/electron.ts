import {BrowserWindowConstructorOptions} from "electron";

export const windowOption: BrowserWindowConstructorOptions = {
	width: 800,
	height: 600,
	webPreferences: {
		nodeIntegration: true,
		enableRemoteModule: true,
		webSecurity: false,
		contextIsolation: false
	},
	hasShadow: true,
	frame: false,
	resizable: true
};

