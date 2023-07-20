import "core-js/stable";
import "regenerator-runtime/runtime";

import { app, BrowserWindow } from "electron";
import { join } from "path";
import { windowOption } from "../config/electron";
import * as remoteMain from "@electron/remote/main";

remoteMain.initialize();
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
app.commandLine.appendSwitch("disable-site-isolation-trials");
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
app.commandLine.appendSwitch("enable-blink-features", "WebCodecs");

let win: BrowserWindow | null;
const isDev = !app.isPackaged;

const createWindow = async () => {
	win = new BrowserWindow({
		...windowOption,
	});

	if (isDev) {
		// Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
		win.webContents.once("dom-ready", () => {
			win!.webContents.openDevTools();
		});
	}

	remoteMain.enable(win.webContents);

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
		win.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/app/src/index.html");
	} else {
		win.loadFile(join(__dirname, "../renderer/index.html"));
	}

	win.on("closed", () => {
		win = null;
	});
};

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createWindow();
	}
});

app.on("browser-window-created", (_, window) => {
	remoteMain.enable(window.webContents);
});

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", () => {
		// Someone tried to run a second instance, we should focus our window.

		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
		}
	});

	// Create myWindow, load the rest of the app, etc...
	app.on("ready", createWindow);
}

// find how to resolve sudoku
