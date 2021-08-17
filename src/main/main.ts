import {BrowserWindow, remote, app} from "electron"
import * as path from "path";
import * as url from "url";
import {windowOption} from "../config/electron";


app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
app.commandLine.appendSwitch("disable-site-isolation-trials");

let win: BrowserWindow | null;



app.whenReady().then(() => {

	if (process.env.NODE_ENV !== "production") {
		// installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
		// 	.then((name) => console.log(`Added Extension:  ${name}`))
		// 	.catch((err) => console.log('An error occurred: ', err));
	}

});

const createWindow = async () => {


	win = new BrowserWindow({
		...windowOption
	});

	if (process.env.NODE_ENV !== "production") {
		process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"; // eslint-disable-line require-atomic-updates
		win.loadURL(`http://localhost:2003`);
	} else {

		win.loadURL(
			url.format({
				pathname: path.join(__dirname, "index.html"),
				protocol: "file:",
				slashes: true
			})
		);
	}

	if (process.env.NODE_ENV !== "production") {
		// Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
		win.webContents.once("dom-ready", () => {
			win!.webContents.openDevTools();
		});
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

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	app.quit();
} else {
	app.on("second-instance", (event, commandLine, workingDirectory) => {
		// Someone tried to run a second instance, we should focus our window.

		if (win) {
			if (win.isMinimized()) win.restore();
			win.focus();
		}
	});

	// Create myWindow, load the rest of the app, etc...
	app.on("ready", createWindow);
}
