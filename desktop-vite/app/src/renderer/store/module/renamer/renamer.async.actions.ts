import { createAsyncActionGenerator, getService } from "../../utils/utils.actions";
import { RenamerService } from "../../../../main/services/media/renamer.service";
import { RenamerState } from "./renamer.types";
import path from "path";

const createAsyncThunk = createAsyncActionGenerator("rename");

export const setRenamerFiles = createAsyncThunk("set-files", (files: string[], { extra }) => {
	const renamerService = getService(RenamerService, extra);

	return renamerService.getFilesNum(files);
});

export const runRename = createAsyncThunk("run", async (_, { extra, getState }) => {
	const renamerService = getService(RenamerService, extra);

	const { renamer } = getState();

	if (!renamer.max || Number.isNaN(renamer.max)) throw new Error("Renamer.Max is not a number");

	await renamerService.rename(renamer.newName, renamer.max, renamer.files);
});

export const runReplaceChars = createAsyncThunk("run-replace-chars", async (_, { extra, getState }) => {
	const renamerService = getService(RenamerService, extra);

	const { renamer } = getState();

	if (!renamer.replaceOptions.search || !renamer.replaceOptions.replaceWith) throw new Error("Renamer.replaceOptions must be filled");

	await renamerService.replaceChar(renamer.replaceOptions.search, renamer.replaceOptions.replaceWith, renamer.files);
});

export const refreshRenamerExample = createAsyncThunk("refresh-example", (_, { extra, getState }): RenamerState["example"] => {
	const { renamer } = getState();
	const renamerService = getService(RenamerService, extra);

	const file = renamer.files.at(0);

	if (!file) return;

	const newName = renamerService.getNewEpisodeName(renamer.newName, file);
	return {
		before: path.basename(file.name),
		after: path.basename(newName),
	};
});
