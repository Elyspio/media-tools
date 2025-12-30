import { createSlice } from "@reduxjs/toolkit";
import { setRenamerField } from "./renamer.action";
import { File, RenamerState } from "./renamer.types";
import { refreshRenamerExample, runRename, setRenamerFiles } from "./renamer.async.actions";
import path from "path";

const defaultState: RenamerState = {
	files: [],
	newName: "",
	replaceOptions: {},
};

const slice = createSlice({
	initialState: defaultState,
	name: "renamer",
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setRenamerField, (state, action) => {
			if (action.payload.field === "max") state.max = action.payload.val as number;
			if (action.payload.field === "min") state.min = action.payload.val as number;
			if (action.payload.field === "newName") state.newName = action.payload.val as string;
			if (action.payload.field === "replaceWith") state.replaceOptions.replaceWith = action.payload.val as string;
			if (action.payload.field === "search") state.replaceOptions.search = action.payload.val as string;
		});

		addCase(setRenamerFiles.fulfilled, (state, action) => {
			state.files = Object.entries(action.payload).map(
				([filename, number]): File => ({
					name: filename,
					num: number,
					extension: path.extname(filename),
				})
			);

			state.min = state.files.reduce((acc, file) => {
				if (file.num < acc) return file.num;
				return acc;
			}, Number.MAX_SAFE_INTEGER);

			state.max = state.files.reduce((acc, file) => {
				if (file.num > acc) return file.num;
				return acc;
			}, Number.MIN_SAFE_INTEGER);
		});
		addCase(runRename.fulfilled, (state) => {
			state.files = [];
			state.newName = "";
			state.min = undefined;
			state.max = undefined;
			state.example = undefined;
			state.replaceOptions = {};
		});

		addCase(refreshRenamerExample.fulfilled, (state, action) => {
			state.example = action.payload;
		});
	},
});

export const { reducer } = slice;
