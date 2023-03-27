import { createSlice } from "@reduxjs/toolkit";
import { Frame } from "../../../core/apis/rest/backend/generated";
import { setScreenShareFrame } from "./screen-share.actions";

export type ScreenShareState = {
	frame?: Frame
};

const initialState: ScreenShareState = {};

const slice = createSlice({
	name: "screen-share",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(setScreenShareFrame, (state, action) => {
			state.frame = action.payload;
		});
	},
});

export const screenShareReducer = slice.reducer;
