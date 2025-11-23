import { dialog, shell } from "electron";
import { promises as fsPromises } from "node:fs";
import path from "node:path";
import { LogModule } from "./log.module";
import { log } from "../utils/logs.utils";
import { injectable } from "inversify";
import type { GetFolderOptions, GetFolderResult } from "@shared/types/dialog.types";
import os from "node:os";
import { RmDirOptions } from "fs";

@injectable()
export class FileModule extends LogModule {
	constructor() {
		super("FileModule");
	}

	@log.debug()
	public async getFolder<WithFiles = true>({ returnFiles }: GetFolderOptions<WithFiles>): Promise<GetFolderResult<WithFiles>> {
		const { filePaths } = await dialog.showOpenDialog({
			properties: ["openDirectory"],
		});
		const folderPath = filePaths.at(0);

		if (!folderPath) return null;

		let files: string[] | undefined;

		if (returnFiles) {
			files = await fsPromises.readdir(folderPath, { recursive: true });
		}

		return {
			folderPath,
			files,
		} as GetFolderResult<WithFiles>;
	}

	@log.debug()
	public async fileExists(filePath: string) {
		try {
			await fsPromises.access(filePath);
			return true;
		} catch (err) {
			return false;
		}
	}

	@log.debug()
	public async openFileFromPath(filePath: string) {
		return new Promise((resolve, reject) => {
			shell
				.openPath(filePath)
				.then(() => resolve(filePath))
				.catch(reject);
		});
	}

	@log.debug([1])
	public async writeFile(binaryContent: Uint8Array, filePath: string): Promise<void> {
		const filePathResolved = path.resolve(filePath);

		await fsPromises.writeFile(filePathResolved, binaryContent);
	}

	getTempFilePath(filename: string) {
		return path.resolve(os.tmpdir(), filename);
	}

	delete(filename: string, options: RmDirOptions | undefined) {
		return fsPromises.rm(filename, options);
	}

	mkdir(filename: string) {
		return fsPromises.mkdir(filename, { recursive: true });
	}

	lstat(filename: string) {
		return fsPromises.lstat(filename);
	}

	rename(from: string, to: string) {
		return fsPromises.rename(from, to);
	}

	readdir(filename: string, recursively?: boolean) {
		return fsPromises.readdir(filename, { recursive: recursively });
	}
}
