import { inject, injectable } from "inversify";
import FilesService from "@services/files/files.service";
import { LatestConfig } from "@shared/config/app.config";

@injectable()
export class ConfigurationService {
	@inject(FilesService)
	filesService!: FilesService;

	public async get(): Promise<LatestConfig> {
		return window.preload.ipc.send.config.local.get();
	}

	public set(config: LatestConfig) {
		return window.preload.ipc.send.config.local.set(config);
	}

	public async regenerate() {
		await window.preload.ipc.send.config.local.regenerate();
	}
}
