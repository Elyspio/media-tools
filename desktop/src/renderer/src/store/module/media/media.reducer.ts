import { createSlice } from "@reduxjs/toolkit";
import { Media } from "@components/internal/encoder/type";
import { setMedias } from "@modules/media/media.async.actions";

export type MediaState = {
	data: Media[];
};

const initialState: MediaState = {
	data: [],
};

export const mediaSlice = createSlice({
	name: "media",
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setMedias.fulfilled, (state, action) => {
			state.data = action.payload;
		});
	},
});
