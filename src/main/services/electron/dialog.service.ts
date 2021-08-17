import {BrowserWindowConstructorOptions} from "electron";
import * as fs from "fs-extra";
import path, {join} from "path";
import * as url from "url";
import {windowOption} from "../../../config/electron";
import {injectable} from "inversify";

const {dialog, BrowserWindow} = require("electron").remote;

@injectable()
export class DialogService {

	/**
	 * @param returnFiles flag to make the function return files in the folder
	 */
	public async selectFolder(returnFiles?: boolean) {

		const path = await dialog.showOpenDialog({
			properties: ["openDirectory"]
		});

		if (path.canceled) return null;

		let folder = this.escape(path.filePaths[0]);

		return {
			folder: folder,
			files: returnFiles ? (await fs.readdir(folder)).map(file => this.escape(join(folder, file))) : undefined
		};

	}

	public async createWindow(target: string, frame: createWindowCustomOption, option?: Partial<BrowserWindowConstructorOptions>) {
		const win = new BrowserWindow({
			...windowOption,
			...option
		});


		const {store} = await import("../../../renderer/store" )

		const search = `route=${target}&options=${JSON.stringify(frame)}&store=${JSON.stringify(store.getState())}`;
		const param = "data=" + btoa(search);
		if (process.env.NODE_ENV !== "production") {
			return win.loadURL(`http://localhost:2003/?${param}`);
		} else {
			return win.loadURL(
				url.format({
					pathname: path.join(__dirname, "index.html"),
					protocol: "file:",
					query: search,
					slashes: true
				})
			);
		}

	}

	private escape = (path: string) => path.replace(/\\/g, "\\\\");

}


export type createWindowCustomOption = {
	title?: string,
	top?: boolean,
	bottom?: boolean,
	/**
	 * overrides top and bottom options
	 */
	modal?: boolean
}
