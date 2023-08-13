import { promises as fs } from "fs";
import * as path from "path";
import { injectable } from "inversify";

@injectable()
export class FilesService {
	public async delete(folder: string, match: RegExp, progress?: (number: number) => void) {
		const folders = await this.find(folder, { match });
		let completed = 0;

		const promises = folders.map(async (f) => {
			await fs.rmdir(f, { recursive: true });
			if (progress) {
				progress(++completed);
			}
		});

		return Promise.all(promises);
	}

	public async deleteNodes(
		nodes: {
			type?: "folder" | "file";
			path: string;
		}[]
	) {
		const promises = nodes.map(async ({ path, type }) => {
			switch (type) {
				case "folder":
					return fs.rmdir(path, { recursive: true });
				case "file":
					return fs.unlink(path);
				default:
					return (await this.isDir(path)) ? fs.rmdir(path, { recursive: true }) : fs.unlink(path);
			}
		});

		await Promise.all(promises);
	}

	public async find(
		folder: string,
		filter?: {
			match: RegExp;
			inverse?: boolean;
		}
	): Promise<string[]> {
		const files: string[] = [];

		const _files = (await fs.readdir(folder)).map((f) => this.escapePath(path.join(folder, f)));

		for (const node of _files) {
			try {
				if (!(await this.isDir(node))) {
					if (filter === undefined) {
						files.push(node);
					} else {
						const match = Boolean(node.match(filter.match)?.length);
						if ((match && !filter.inverse) || (!match && filter.inverse)) files.push(node);
					}
				} else {
					files.push(...(await this.find(node, filter)));
				}
			} catch (e) {
				//
			}
		}

		return files;
	}

	public async list(folder: string, ignore?: string[]) {
		const files: string[] = [];

		const _files = (await fs.readdir(folder)).map((f) => this.escapePath(path.join(folder, f)));

		const promises = _files.map(async (node) => {
			try {
				if (await this.isDir(node)) {
					files.push(node);

					if (!ignore || !ignore.some((i) => node.includes(i))) {
						files.push(...(await this.list(node, ignore)));
					}
				}
			} catch (e) {
				//
			}
		});

		await Promise.all(promises);

		return files;
	}

	public escapePath = (path: string) => path.replace(/\\/g, "\\\\");

	public async moveDirectory(src: string, dest: string) {
		const files = await fs.readdir(src);
		await Promise.all(files.map((f) => this.move(path.join(src, f), path.join(dest, f))));
		await fs.rmdir(src, { recursive: true });
	}

	public watch(folder: string, action: (filename: string) => void) {
		const ac = new AbortController();

		const { signal } = ac;

		(async () => {
			try {
				const watcher = fs.watch(folder, { signal });

				for await (const event of watcher) action(event.filename!);
			} catch (err) {
				if ((err as Error).name === "AbortError") return;
				throw err;
			}
		})();

		return () => ac.abort();
	}

	/**
	 * Replace all occurences of a string by another one in a file
	 * @param filepath path to the file
	 * @param search value to be replaced
	 * @param value value with which you replace
	 */
	public async replaceInFile(filepath: string, search: string | RegExp, value: string) {
		const file = await fs.readFile(filepath);
		let fileContent = file.toString("utf8");
		fileContent = fileContent.replaceAll(search, value);
		await fs.writeFile(filepath, fileContent, { encoding: "utf8" });
	}

	private isDir = async (path: string) => (await fs.lstat(path)).isDirectory();

	async checkPathExists(path: string) {
		try {
			await fs.access(path);
			// if it doesn't throw an error, the file or directory exists
			return true;
		} catch (error) {
			// if it throws an error, the file or directory does not exist
			return false;
		}
	}

	async ensureDir(dir: string) {
		if (await this.checkPathExists(dir)) return;
		await fs.mkdir(dir, { recursive: true });
	}

	async move(from: string, to: string) {
		await fs.rename(from, to);
	}
}
