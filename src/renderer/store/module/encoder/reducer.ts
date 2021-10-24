import { createReducer } from "@reduxjs/toolkit";
import { store } from "../..";
import { setOnFinishAction, setProcessStatus, updateProcessPercentage } from "./action";
import { SystemService } from "../../../../main/services/system/system.service";
import { DependencyInjectionKeys } from "../../../../main/services/dependency-injection/dependency-injection.keys";
import { container } from "../../../../main/services/dependency-injection/dependency-injection.container";

export const onFinishActionList = <const>["Sleep", "Shutdown", "Hibernate", "Lock", "None"];

export interface EncoderState {
	onFinishAction?: typeof onFinishActionList[number];
	processes?: {
		finished: number;
		total: number;
	};
	eta?: number;
}

const defaultState: EncoderState = {
	onFinishAction: "None",
};

const systemService = container.get<SystemService>(DependencyInjectionKeys.electron.dialog);

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

export const reducer = createReducer<EncoderState>(defaultState, builder => {
	builder.addCase(setOnFinishAction, (state, action) => {
		state.onFinishAction = action.payload;
	});
	builder.addCase(setProcessStatus, (state, action) => {
		state.processes = action.payload;
	});
	builder.addCase(updateProcessPercentage, (state, action) => {
		if (state.processes) {
			state.processes = {
				...state.processes,
				finished: action.payload,
			};
		}
	});
});
