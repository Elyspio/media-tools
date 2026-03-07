import { dialog, shell } from "electron";
import { type Dirent, promises as fsPromises, type RmDirOptions } from "node:fs";
import { LogModule } from "./log.module";
import { log } from "../utils/logs.utils";
import { injectable } from "inversify";
import type { FileInfo, GetFolderOptions, GetFolderResult } from "@shared/types/dialog.types";
import path from "node:path";
import os from "os";

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

		let files: Dirent[] | undefined;

		if (returnFiles) {
			files = await fsPromises.readdir(folderPath, { withFileTypes: true });
		}

		const filesInfo = await Promise.all(
			(files ?? []).map(async (dirent): Promise<FileInfo> => {
				const filePath = path.resolve(dirent.parentPath, dirent.name);
				const stats = await fsPromises.lstat(filePath);

				return {
					name: dirent.name,
					type: stats.isDirectory() ? "directory" : "file",
					path: filePath,
					size: stats.size,
				};
			})
		);

		return {
			folderPath,
			files: filesInfo,
		} as unknown as GetFolderResult<WithFiles>;
	}

	@log.debug()
	public async fileExists(filePath: string) {
		try {
			await fsPromises.access(filePath);
			return true;
		} catch {
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

	async rename(from: string, to: string) {
		const toDir = path.dirname(to);

		await fsPromises.mkdir(toDir, { recursive: true });

		await fsPromises.rename(from, to);
	}

	readdir(filename: string, recursively?: boolean) {
		return fsPromises.readdir(filename, { recursive: recursively });
	}
}
