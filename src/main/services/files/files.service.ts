import {promises as fs} from "fs";
import * as fse from "fs-extra";
import {WatchListener} from "fs-extra";
import * as path from "path";
import {Readable} from "stream";
import {Extract} from "unzipper";
import {injectable} from "inversify";


@injectable()
export class FilesService {

	public async delete(folder: string, match: RegExp, progress?: (number: number) => void) {
		const folders = await this.find(folder, {match});
		let completed = 0;

		const promises = folders.map(async f => {
			await fs.rmdir(f, {recursive: true});
			if (progress) {
				progress(++completed);
			}

		});

		return Promise.all(promises);
	}

	public async deleteNodes(nodes: { type?: "folder" | "file", path: string }[]) {
		const promises = nodes.map(async ({path, type}) => {
			switch (type) {
				case "folder":
					return fs.rmdir(path, {recursive: true});
				case "file":
					return fs.unlink(path);
				default:
					return await this.isDir(path) ? fs.rmdir(path, {recursive: true}) : fs.unlink(path);
			}
		});

		await Promise.all(promises);

	}

	public async find(folder: string, filter?: { match: RegExp, inverse?: boolean }): Promise<string[]> {
		const files: string[] = [];

		const _files = (await fs.readdir(folder)).map(f => this.escapePath(path.join(folder, f)));

		for (const node of _files) {
			try {
				if (!await this.isDir(node)) {
					if (filter === undefined) {
						files.push(node);
					} else {
						const match = Boolean(node.match(filter.match)?.length);
						if (match && !filter.inverse || !match && filter.inverse) files.push(node);
					}
				} else {
					files.push(...await this.find(node, filter));
				}
			} catch (e) {
			}

		}

		return files;
	}

	public async list(folder: string, ignore?: string[]) {
		const files: string[] = [];

		const _files = (await fs.readdir(folder)).map(f => this.escapePath(path.join(folder, f)));


		const promises = _files.map(async (node) => {

			try {
				if (await this.isDir(node)) {

					files.push(node);

					if (!ignore || !ignore.some(i => node.includes(i))) {
						files.push(...await this.list(node, ignore));
					}
				}
			} catch (e) {
			}
		});

		await Promise.all(promises);

		return files;

	}

	public escapePath = (path: string) => path.replace(/\\/g, "\\\\");

	/**
	 * Unzip data to a directory
	 * @param data
	 * @param output
	 */
	public async unzip(data: ArrayBuffer, output: string) {
		const readable = new Readable();
		readable._read = () => {
		}; // _read is required but you can noop it
		readable.push(Buffer.from(data));
		readable.push(null);

		return readable
			.pipe(Extract({path: output}))
			.promise();

	}

	public async moveContent(src: string, dest: string) {
		const files = await fse.readdir(src);
		await Promise.all(
			files.map(f => fse.move(path.join(src, f), path.join(dest, f)))
		);
		await fs.rmdir(src, {recursive: true});
	}

	public watch(folder: string, action: WatchListener<string>) {
		console.debug("Watch folder", folder);

		let fsWatcher = fse.watch(folder, {recursive: true, encoding: "utf8"}, (event, filename) => {
			filename = path.join(folder, filename);
			console.debug("new action", {event, filename});
			action(event, filename);
		});
		return () => {
			console.debug("Unwatch folder", folder);
			fsWatcher.close();
		};
	}

	/**
	 * Replace all occurences of a string by another one in a file
	 * @param filepath path to the file
	 * @param search value to be replaced
	 * @param value value with which you replace
	 */
	public async replaceInFile(filepath: string, search: string | RegExp, value: string) {
		const file = (await fse.readFile(filepath));
		let fileContent = file.toString("utf8");
		fileContent = fileContent.replaceAll(search, value);
		await fse.writeFile(filepath, fileContent, {encoding: "utf8"});
	}

	private isDir = async (path: string) => (await fs.lstat(path)).isDirectory();


}
