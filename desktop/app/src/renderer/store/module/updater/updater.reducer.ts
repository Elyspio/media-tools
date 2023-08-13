import { createReducer } from "@reduxjs/toolkit";
import { setDownloadPercentage, setServerLatestVersion, setServerUrl } from "./updater.action";
import { updateServer } from "@/config/update";
import { AppVersion } from "@apis/rest/updater";

export interface UpdateState {
	download?: number;
	serverVersion?: AppVersion;
	serverUrl: string;
}

const defaultState: UpdateState = {
	serverUrl: updateServer,
};

export const reducer = createReducer<UpdateState>(defaultState, (builder) => {
	builder.addCase(setDownloadPercentage, (state, action) => {
		state.download = action.payload;
	});

	builder.addCase(setServerLatestVersion, (state, action) => {
		state.serverVersion = action.payload;
	});

	builder.addCase(setServerUrl, (state, action) => {
		state.serverUrl = action.payload;
	});
});
