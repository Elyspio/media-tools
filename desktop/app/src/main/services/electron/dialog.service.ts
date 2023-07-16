import { BrowserWindowConstructorOptions } from "electron";
import * as fs from "fs-extra";
import * as path from "path";
import * as url from "url";
import { windowOption } from "../../../config/electron";
import { injectable } from "inversify";
import * as remote from "@electron/remote";
import { enable } from "@electron/remote/main";

@injectable()
export class DialogService {
	/**
	 * @param returnFiles flag to make the function return files in the folder
	 */
	public async selectFolder(returnFiles?: boolean) {
		const { canceled, filePaths } = await remote.dialog.showOpenDialog({
			properties: ["openDirectory"],
		});

		if (canceled) return null;

		let folder = this.escape(filePaths[0]);

		return {
			folder: folder,
			files: returnFiles ? (await fs.readdir(folder)).map(file => this.escape(path.join(folder, file))) : undefined,
		};
	}

	public async createWindow(target: string, frame: createWindowCustomOption, option?: Partial<BrowserWindowConstructorOptions>) {
		const win = new remote.BrowserWindow({
			...windowOption,
			...option,
			show: false,
		});

		const { store } = await import("../../../renderer/store");

		const params = {
			store: store.getState(),
			route: target,
			frame,
		};

		enable(win.webContents);
		// win.webContents.executeJavaScript(`window.params = "${JSON.stringify(params)}"`);
		win.webContents.openDevTools();

		if (process.env.NODE_ENV !== "production") {
			await win.loadURL(`http://localhost:2003/`);
		} else {
			await win.loadURL(
				url.format({
					pathname: path.join(__dirname, "index.html"),
					protocol: "file:",
					slashes: true,
				})
			);
		}

		win.show();
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
