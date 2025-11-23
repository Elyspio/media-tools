/*
 * Interface representing the state of a Renamer.
 */
export interface RenamerState {
	/*
	 * An array of `File` objects representing the files that are going to be renamed.
	 */
	files: File[];

	/*
	 * The new name that is going to be applied to the files.
	 */
	newName: string;

	/*
	 * Optional property representing the minimum number associated with renaming operation.
	 */
	min?: number;

	/*
	 * Optional property representing the maximum number associated with renaming operation.
	 */
	max?: number;

	/*
	 * Represents an example string for rename operation.
	 */
	example?: {
		before: string;
		after: string;
	};

	/*
	 * Utility options.
	 */
	replaceOptions: {
		/**
		 * The substring that would be searched for in the original file names.
		 */
		search?: string;
		/**
		 * `The substring that would replace the searched substring in the file names.
		 */
		replaceWith?: string;
	};
}

interface File {
	/**
	 * The name of the file.
	 */
	name: string;

	/**
	 * A number associated with the file. This could be an ID, a version number, or other numeric data.
	 */
	num: number;

	/**
	 * The extension of the file, such as '.txt', '.ts', etc.
	 */
	extension: string;
}
