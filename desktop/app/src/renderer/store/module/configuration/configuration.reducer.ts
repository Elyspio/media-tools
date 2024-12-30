import { createSlice } from "@reduxjs/toolkit";
import { setConfig } from "./configuration.async.actions";
import { defaultConfiguration } from "@/config/configuration";
import { ConfigurationRouter } from "@modules/configuration/configuration.types";

const initialState: ConfigurationRouter = {
	current: defaultConfiguration,
	isWindowUnderSized: false,
};

export const slice = createSlice({
	name: "configuration",
	reducers: {},
	initialState,
	extraReducers: (builder) => {
		builder.addCase(setConfig.fulfilled, (state, action) => {
			state.current = action.meta.arg;
		});
	},
});

export const { reducer: configurationReducer } = slice;
