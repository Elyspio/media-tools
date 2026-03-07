import { LogModule } from "./log.module";
import { MacUpdater, NsisUpdater } from "electron-updater";
import { mainConfig } from "@shared/config/main.config";
import * as os from "node:os";
import { IpcModule } from "./ipc.module";
import { log } from "../utils/logs.utils";
import { inject, injectable, LazyServiceIdentifier } from "inversify";

const updateFeed = mainConfig.autoUpdate.url + (process.platform === "darwin" ? `mac/${os.arch()}` : "win");

const AutoUpdater = process.platform === "darwin" ? MacUpdater : NsisUpdater;

@injectable()
export class UpdateModule extends LogModule {
	private readonly autoUpdater: MacUpdater | NsisUpdater | undefined;
	private checkTimeout: NodeJS.Timeout | undefined;

	public constructor(@inject(new LazyServiceIdentifier(() => IpcModule)) private readonly ipcModule: IpcModule) {
		super("UpdateModule");
		if (!mainConfig.autoUpdate.url) {
			this.logger.warn("No update feed provided");
			return;
		}

		this.logger.info("UpdateFeed", updateFeed);

		this.autoUpdater = new AutoUpdater({
			url: updateFeed,
			provider: "generic",
		});

		this.autoUpdater.allowDowngrade = true;
		this.autoUpdater.autoDownload = false;
		this.autoUpdater.forceDevUpdateConfig = true;

		this.autoUpdater.on("update-available", (info) => {
			this.ipcModule.sendIpcToMainContent("update:available", info.version);
		});

		this.autoUpdater.on("download-progress", (progress) => {
			this.ipcModule.sendIpcToMainContent("update:download:progress", progress.percent);
		});

		this.autoUpdater.on("update-downloaded", () => {
			this.ipcModule.sendIpcToMainContent("update:download:end");
		});

		this.autoUpdater.on("error", (err, msg) => {
			this.logger.error(`An error occurred during update ${msg}`, err);
		});

		this.autoUpdater.on("checking-for-update", () => {
			this.logger.debug("Checking for update");
		});

		this.autoUpdater.on("update-not-available", (info) => {
			this.logger.debug("No update available");
			this.ipcModule.sendIpcToMainContent("update:available", info.version);
		});
	}

	@log.debug()
	public async checkForUpdates() {
		this.logger.info("Checking for updates");

		if (!this.autoUpdater) return;

		try {
			const result = await this.autoUpdater.checkForUpdatesAndNotify();
			this.logger.info("Server version: ", result?.updateInfo.version);
		} catch (e) {
			this.logger.error("An error occurred while checking for updates", e);
		} finally {
			if (this.checkTimeout) clearTimeout(this.checkTimeout);
			this.checkTimeout = setTimeout(() => this.checkForUpdates(), mainConfig.autoUpdate.checkDelay * 60 * 1000);
		}
	}

	@log.debug()
	public quitAndInstall() {
		this.logger.info("Quitting and installing update");

		this.autoUpdater!.quitAndInstall(false, true);
	}

	@log.debug()
	async downloadUpdate() {
		this.logger.info("Downloading update");

		await this.autoUpdater!.downloadUpdate();
	}
}
