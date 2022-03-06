import { createReducer } from "@reduxjs/toolkit";
import { store } from "../../index";
import { setOnFinishAction, setProcessStatus, updateProcessPercentage } from "./encoder.action";
import { SystemService } from "../../../../main/services/system/system.service";
import { container } from "../../../../main/services/dependency-injection/dependency-injection.container";
import { Encoder } from "../../../components/modules/internal/encoder/type";
import { encodingProcess, setCurrentProcess, setFFmpegInstalled, setFormat } from "../media/media.action";

export const onFinishActionList = <const>["Sleep", "Shutdown", "Hibernate", "Lock", "None"];

export interface EncoderState {
	onFinishAction?: typeof onFinishActionList[number];
	processes?: {
		finished: number;
		total: number;
	};
	eta?: number;
	format: Encoder["value"]["ffmpeg"];
	isSoftInstalled?: boolean;
	currentProcessPid?: number;
}

const defaultState: EncoderState = {
	onFinishAction: "None",
	format: "hevc_nvenc",
};

const systemService = container.get(SystemService);

export const getOnFinishAction = () => {
	const actions: { [key in typeof onFinishActionList[number]]: () => any } = {
		Hibernate: systemService.hibernate,
		Lock: systemService.lock,
		Shutdown: systemService.shutdown,
		Sleep: systemService.sleep,
		None: () => {},
	};

	return actions[store.getState().encoder.onFinishAction ?? "None"];
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

	addCase(setCurrentProcess, (state, action) => {
		state.currentProcessPid = action.payload?.pid;
		if (action.payload) {
			encodingProcess.current = action.payload;
		} else {
			encodingProcess.current = undefined;
		}
	});
});
