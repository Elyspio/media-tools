import { createSlice } from "@reduxjs/toolkit";
import { Media, ProcessData } from "../../../components/modules/internal/encoder/type";
import { setMedias, setProcesses, setProgress } from "./media.action";

export type MediaState = {
	medias: Media[];
	process: ProcessData[];
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
		});

		addCase(setProgress, (state, action) => {
			let process = state.process.find(p => p.media.file.path === action.payload.media.file.path);
			if (process) {
				process.percentage = action.payload.percentage;
			}
		});
	},
});
