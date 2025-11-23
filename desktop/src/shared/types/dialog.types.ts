export type GetFolderResult<WithFiles = true> =
	| ({
			folderPath: string;
	  } & (WithFiles extends true ? { files: string[] } : { files: undefined }))
	| null;

export type GetFolderOptions<WithFiles = false> = {
	returnFiles?: WithFiles;
};
