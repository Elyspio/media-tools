import {createAction, createSlice} from "@reduxjs/toolkit";
import {Encoder, Media, ProcessData} from "../../components/modules/internal/encoder/type";


export const setMedias = createAction<Media[]>("setMedia");


// Encoder

export const setFormat = createAction<Encoder["value"]["ffmpeg"]>("setFormat");
export const setFFmpegInstalled = createAction<boolean>("setFFmpegInstalled");
export const setProcess = createAction<ProcessData[]>("setProcess");
export const setProgress = createAction<ProcessData>("setProgress");


export type MediaState = {
	medias: Media[]
	process: ProcessData[],

	encoder: {
		format: Encoder["value"]["ffmpeg"]
		isSoftInstalled?: boolean,
	}
}

const initialState: MediaState = {
	medias: [],
	process: [],
	encoder: {
		isSoftInstalled: undefined,
		format: "hevc_nvenc"
	}

};

export const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {},
	extraReducers: ({addCase}) => {
		addCase(setMedias, (state, action) => {
			state.medias = action.payload;
		});

		addCase(setFormat, (state, action) => {
			state.encoder.format = action.payload;
		});

		addCase(setFFmpegInstalled, (state, action) => {
			state.encoder.isSoftInstalled = action.payload;
		});

		addCase(setProcess, (state, action) => {
			state.process = action.payload;
		});

		addCase(setProgress, (state, action) => {
			let process = state.process.find(p => p.media.file.path === action.payload.media.file.path);
			if (process) {
				process.percentage = action.payload.percentage;
			}
		});

	}
});


