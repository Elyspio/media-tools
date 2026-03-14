import { createAsyncThunk as _createAsyncThunk } from "@reduxjs/toolkit";
import { ExtraArgument } from "../index";
import { ActionCreatorWithPayload, AsyncThunkPayloadCreator, createAction as _createAction } from "@reduxjs/toolkit";

type Constructor<T> = new (...args: any[]) => T;

export function getService<T>(service: Constructor<T>, extra): T {
	const { container } = extra as ExtraArgument;
	return container.get(service);
}

type RejectedAwareAction = {
	meta: {
		requestStatus: string;
	};
	error?: {
		message?: string;
	};
};

export function throwIfRejected(action: RejectedAwareAction) {
	if (action.meta.requestStatus === "rejected") throw new Error(action.error?.message);
}

export function createReplaceAction<T>(creator: <T>(module: string) => any): ActionCreatorWithPayload<T, string> {
	return creator("replace");
}

export function createAsyncActionGenerator(prefix: string) {
	return function createAsyncThunk<Returned, ThunkArg = void>(suffix: string, payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, { extra: ExtraArgument }>) {
		return _createAsyncThunk<Returned, ThunkArg>(`${prefix}/${suffix}`, payloadCreator);
	};
}

export function createActionGenerator(prefix: string) {
	return <T = void>(suffix: string) => _createAction<T>(`${prefix}/${suffix}`);
}
