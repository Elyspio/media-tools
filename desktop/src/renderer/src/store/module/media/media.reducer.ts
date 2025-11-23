import { createSlice } from "@reduxjs/toolkit";
import { Media, ProcessData } from "@components/internal/encoder/type";
import { setMedias, setProcesses, setProgress } from "./media.action";
import { selectFolder } from "@modules/media/media.async.actions";

export type MediaState = {
	medias: Media[];
	process: ProcessData[];
	selected?: {
		folder: string;
		files: string[];
	};
};

const initialState: MediaState = {
	medias: [],
	process: [],
};

export const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setMedias, (state, action) => {
			state.medias = action.payload;
		});

		addCase(setProcesses, (state, action) => {
			state.process = action.payload;
			state.process.sort((p1, p2) => p1.media.file.path.localeCompare(p2.media.file.path));
		});

		addCase(setProgress, (state, action) => {
			const process = state.process.find((p) => p.media.file.path === action.payload.media.file.path);
			if (process) {
				process.percentage = action.payload.percentage;
			}
		});

		addCase(selectFolder.fulfilled, (state, action) => {
			if (!action.payload) {
				state.selected = undefined;
				return;
			}
			state.selected = {
				folder: action.payload.folderPath,
				files: action.payload.files,
			};
		});
	},
});
