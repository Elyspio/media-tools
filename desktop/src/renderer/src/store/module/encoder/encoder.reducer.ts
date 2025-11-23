import { createReducer } from "@reduxjs/toolkit";
import { setOnFinishAction, setProcessStatus, updateProcessPercentage } from "./encoder.action";
import { Encoder } from "@components/internal/encoder/type";
import { setFFmpegInstalled, setFormat } from "../media/media.action";

export const onFinishActionList = <const>["Sleep", "Shutdown", "Hibernate", "Lock", "None"];

export interface EncoderState {
	onFinishAction?: (typeof onFinishActionList)[number];
	processes?: {
		finished: number;
		total: number;
	};
	format: Encoder["value"]["ffmpeg"];
	isSoftInstalled?: boolean;
	currentProcessPid?: number;
}

const defaultState: EncoderState = {
	onFinishAction: "None",
	format: "hevc_nvenc",
};

export const reducer = createReducer<EncoderState>(defaultState, ({ addCase }) => {
	addCase(setOnFinishAction, (state, action) => {
		state.onFinishAction = action.payload;
	});
	addCase(setProcessStatus, (state, action) => {
		state.processes = action.payload;
	});
	addCase(updateProcessPercentage, (state, action) => {
		if (state.processes) {
			state.processes = {
				...state.processes,
				finished: action.payload,
			};
		}
	});

	addCase(setFormat, (state, action) => {
		state.format = action.payload;
	});

	addCase(setFFmpegInstalled, (state, action) => {
		state.isSoftInstalled = action.payload;
	});
	//
	// addCase(setCurrentProcess, (state, action) => {
	// 	state.currentProcessPid = action.payload?.pid;
	// 	if (action.payload) {
	// 		encodingProcess.current = action.payload;
	// 	} else {
	// 		encodingProcess.current = undefined;
	// 	}
	// });
});
