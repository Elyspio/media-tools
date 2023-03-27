import { BrowserWindowConstructorOptions } from "electron";
import * as fs from "fs-extra";
import { injectable } from "inversify";
import { windowOption } from "../../../config/electron";
import url from "url";
import path from "path";

const { dialog, BrowserWindow, require: nodeRequire } = require("@electron/remote");

@injectable()
export class DialogService {
	/**
	 * @param returnFiles flag to make the function return files in the folder
	 */
	public async selectFolder(returnFiles?: boolean) {
		const path = await dialog.showOpenDialog({
			properties: ["openDirectory"],
		});

		if (path.canceled) return null;

		let folder = this.escape(path.filePaths[0]);

		return {
			folder: folder,
			files: returnFiles ? (await fs.readdir(folder)).map(file => this.escape(path.join(folder, file))) : undefined,
		};
	}

	public async createWindow(target: string, frame: createWindowCustomOption, option?: Partial<BrowserWindowConstructorOptions>) {
		const win = new BrowserWindow({
			...windowOption,
		});

		nodeRequire("@electron/remote/main").enable(win.webContents);
		win.webContents.openDevTools();

		if (process.env.NODE_ENV !== "production") {
			process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1"; // eslint-disable-line require-atomic-updates
			await win.loadURL(`http://localhost:2003`);
		} else {
			await win.loadURL(
				url.format({
					pathname: path.join(__dirname, "index.html"),
					protocol: "file:",
					slashes: true,
				})
			);
		}

		if (process.env.NODE_ENV !== "production") {
			// Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
			win.webContents.once("dom-ready", () => {
				win!.webContents.openDevTools();
			});
		}

		// const win = new BrowserWindow({
		// 	...windowOption,
		// 	...option,
		// });
		//
		//
		// nodeRequire("@electron/remote/main").enable(win.webContents);
		// win.webContents.openDevTools();
		//
		// const { store } = await import("../../../renderer/store");
		//
		// const search = `route=${target}&options=${JSON.stringify(frame)}&store=${JSON.stringify(store.getState())}`;
		// const param = "data=" + btoa(search);
		// if (process.env.NODE_ENV !== "production") {
		// 	return win.loadURL(`http://localhost:2003/?${param}`);
		// } else {
		// 	return win.loadURL(
		// 		url.format({
		// 			pathname: path.join(__dirname, "index.html"),
		// 			protocol: "file:",
		// 			query: search,
		// 			slashes: true,
		// 		})
		// 	);
		// }
	}

	private escape = (path: string) => path.replace(/\\/g, "\\\\");
}

export type createWindowCustomOption = {
	title?: string;
	top?: boolean;
	bottom?: boolean;
	/**
	 * overrides top and bottom options
	 */
	modal?: boolean;
};
