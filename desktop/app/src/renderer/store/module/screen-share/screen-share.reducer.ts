import { createSlice } from "@reduxjs/toolkit";
import { ScreenShareState } from "./screen-share";
import { setStreamId } from "./screen-share.action";

const defaultState: ScreenShareState = {};

const slice = createSlice({
	initialState: defaultState,
	name: "screen-share",
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setStreamId, (state, action) => {
			state.streamId = action.payload;
		});
	},
});

export const { reducer } = slice;
