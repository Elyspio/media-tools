import {createSlice} from "@reduxjs/toolkit";
import {Encoder, Media, ProcessData} from "../../../components/modules/internal/encoder/type";
import {encodingProcess, setCurrentProcess, setFFmpegInstalled, setFormat, setMedias, setProcesses, setProgress} from "./media.action";


export type MediaState = {
	medias: Media[]
	process: ProcessData[],
	encoder: {
		format: Encoder["value"]["ffmpeg"]
		isSoftInstalled?: boolean,
		currentProcessPid?: number
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

		addCase(setProcesses, (state, action) => {
			state.process = action.payload;
		});

		addCase(setProgress, (state, action) => {
			let process = state.process.find(p => p.media.file.path === action.payload.media.file.path);
			if (process) {
				process.percentage = action.payload.percentage;
			}
		});


		addCase(setCurrentProcess, (state, action) => {
			state.encoder.currentProcessPid = action.payload?.pid;
			if (action.payload) {
				encodingProcess.current = action.payload;
			} else {
				encodingProcess.current = undefined;
			}
		});

	}
});


