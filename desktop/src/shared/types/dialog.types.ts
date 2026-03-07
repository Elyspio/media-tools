export type GetFolderResult<WithFiles = true> =
	| ({
			folderPath: string;
	  } & (WithFiles extends true ? { files: FileInfo[] } : { files: undefined }))
	| null;

export type GetFolderOptions<WithFiles = false> = {
	returnFiles?: WithFiles;
};

export type FileInfo = {
	name: string;
	path: string;
	size: number;
	type: "file" | "directory";
};
