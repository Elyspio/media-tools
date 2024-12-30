import { injectable } from "inversify";
import path from "path";
import { RenamerState } from "@modules/renamer/renamer.types";
import * as fs from "fs/promises";

// Custom service for renaming files
@injectable()
export class RenamerService {
	/**
	 * Given a list of filenames, split each filename into words and find an index for a sequence of numbers.
	 * Optionally, transform any '-' or '_' into a space, and add a space before and after any '.'
	 * @param filenames - An array of filenames
	 * @return An object mapping each file to its corresponding sequence number.
	 */
	public getFilesNum(filenames: string[]): Record<string, number> {
		const names = filenames.map((name) =>
			name
				.trim()
				.replace(/-_/g, " ")
				.replace(/\./g, " . ")
				.replace(/([0-9]*)E([0-9]+)/g, "$1 E $2"),
		);

		const splited = names.map((name) => name.split(" "));

		let numIndex = -1;

		if (names.length === 1) {
			for (let i = 0; i < splited.length; i++) {
				if (!Number.isNaN(Number(splited[i]))) {
					numIndex = i;
				}
			}
		}

		if (names.length > 1) {
			const littleOne = splited.reduce((a, b) => (a.length < b.length ? a : b));
			for (let index = 0; index < littleOne.length; index++) {
				if (Number.isNaN(Number(splited[0][index]))) continue;
				const possibleNum = Number.parseInt(splited[0][index]);
				if (possibleNum + 1 === Number.parseInt(splited[1][index])) numIndex = index;
			}
		}

		return filenames.reduce(
			(acc, file, fileIndex) => {
				acc[file] = Number.parseInt(splited[fileIndex][numIndex]);
				return acc;
			},
			{} as Record<string, number>,
		);
	}

	/**
	 * Based on the provided name and episode information, constructs a new filename for the episode.
	 * @param newName - The new name to be used in the filename
	 * @param episode - Information about the episode
	 * @return The new filename.
	 */
	public getNewEpisodeName(newName: string, episode: RenamerState["files"][number]) {
		const name = newName.trim();
		return `${path.dirname(episode.name)}${path.sep}${name} ${episode.num}.${episode.extension}`;
	}

	/**
	 * Renames a given list of files by applying a new name and a sequence of numbering. If new name is not provided,
	 * the function will throw an error.
	 * @param newName - The new name to be used in the filename
	 * @param files - The collection of files to rename
	 * @return A Promise that resolves once all files have been renamed
	 */
	public async rename(newName: string, files: RenamerState["files"]): Promise<any> {
		if (!(newName !== undefined && newName?.length > 0)) throw new Error("New name is empty");

		return Promise.all(
			files.map((file) => {
				return async () => {
					await fs.rename(file.name, this.getNewEpisodeName(newName, file));
				};
			}),
		);
	}

	/**
	 * Escape regex special characters in a string.
	 *
	 * @param str - The string to be escaped.
	 * @returns - The escaped string.
	 */
	private escapeRegex(str: string) {
		return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
	}

	/**
	 * Replace certain characters in the file names.
	 *
	 * @param search - The string to be replaced.
	 * @param replaceWith - The string to replace with.
	 * @param files - The array of files where the renaming should occur.
	 */
	async replaceChar(search: string, replaceWith: string, files: RenamerState["files"]) {
		const regExp = new RegExp(this.escapeRegex(search), "g");
		await Promise.all(
			files.map(async (episode) => {
				if (replaceWith && search) {
					const newFileName = path.basename(episode.name).replace(regExp, replaceWith);
					await fs.rename(episode.name, path.join(path.dirname(episode.name), newFileName));
				}
			}),
		);
	}
}
