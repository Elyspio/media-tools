import * as remote from "@electron/remote";
import * as config from "../../config/update";
import { pathToInstaller, updateRefreshRate } from "../../config/update";
import { arch, platform } from "os";
import { ensureDir, writeFile } from "fs-extra";
import * as path from "path";
import { store } from "../../renderer/store";
import { setDownloadPercentage, setServerLatestVersion } from "../../renderer/store/module/updater/updater.action";
import { spawn } from "child_process";
import { setPath } from "../../renderer/store/module/router/router.action";
import { Logger } from "./logger";

import { AppArch, AppsApi, AppVersion } from "../apis/rest/updater";

const { app, dialog } = remote;

const logger = Logger("Updater");

const getPlatform = (): AppArch => {
	const currentArch = arch();
	let plat = platform();
	const exception = new Error("Unsupported platform");
	if (plat === "win32") {
		if (currentArch === "x32") return "Win32";
		if (currentArch === "x64") return "Win64";
	}
	throw exception;
};

export function getVersion() {
	return process.env.NODE_ENV === "production" ? app.getVersion() : (process.env.npm_package_version as string);
}

const getServerUrl = () => {
	return store.getState().updater.serverUrl;
};

let isUpdating = false;

export async function checkUpdate() {
	const api = new AppsApi(undefined, getServerUrl());

	const version = getVersion();

	const plat = getPlatform();

	try {
		if (isUpdating) return;

		const [major, minor, revision] = version.split(".").map(x => parseInt(x));
		const { data: server } = await api.getLatestArchSpecificVersion(config.appName, plat);

		store.dispatch(setServerLatestVersion(server));

		if (server.major > major || server.minor > minor || server.revision > revision) {
			isUpdating = true;
			const { response } = await dialog.showMessageBox({
				title: "Update",
				message: "A new version is available",
				buttons: ["Download", "Don't ask again", "Cancel"],
			});

			if (response === 0) {
				store.dispatch(setPath("/updater"));
				await downloadUpdate(server);

				const { response } = await dialog.showMessageBox({
					title: "Update",
					message: "Application is ready to update",
					buttons: ["Install", "Cancel"],
				});
				if (response === 0) {
					await installUpdate();
				}
			} else {
				logger.debug("User does not want to update");
			}
		} else {
			logger.debug("You are running on the latest version");
		}
	} catch (e) {
		logger.error("checkUpdate", e);
	} finally {
		isUpdating = false;
	}

	setTimeout(checkUpdate, updateRefreshRate);
}

export async function downloadUpdate(version: AppVersion) {
	const plat = getPlatform();
	const api = new AppsApi(undefined, getServerUrl());

	const bin = await api.getBinary(config.appName, version.raw, plat, {
		responseType: "arraybuffer",
		onDownloadProgress: progressEvent => {
			store.dispatch(setDownloadPercentage((progressEvent.loaded * 100) / progressEvent.total!));
		},
	});

	const data = new Buffer(bin.data as any);
	await ensureDir(path.dirname(pathToInstaller));
	await writeFile(pathToInstaller, data);
	return pathToInstaller;
}

export async function installUpdate() {
	const filename = path.basename(pathToInstaller);
	const dir = path.dirname(pathToInstaller);
	const p = spawn(filename, { detached: true, stdio: "ignore", cwd: dir });
	p.unref();
	app.quit();
}
