import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TorrentState } from "./torrent.types";
import { searchTorrents, sendTorrent } from "./torrent.async.actions";

const defaultState: TorrentState = {
	query: "",
	results: [],
	loading: false,
	sendingId: null,
};

const slice = createSlice({
	name: "torrent",
	initialState: defaultState,
	reducers: {
		setQuery(state, action: PayloadAction<string>) {
			state.query = action.payload;
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(searchTorrents.pending, (state) => {
			state.loading = true;
		});
		addCase(searchTorrents.fulfilled, (state, action) => {
			state.loading = false;
			state.results = action.payload;
		});
		addCase(searchTorrents.rejected, (state) => {
			state.loading = false;
		});

		addCase(sendTorrent.pending, (state, action) => {
			state.sendingId = action.meta.arg.id;
		});
		addCase(sendTorrent.fulfilled, (state) => {
			state.sendingId = null;
		});
		addCase(sendTorrent.rejected, (state) => {
			state.sendingId = null;
		});
	},
});

export const { reducer: torrentReducer, actions: torrentActions } = slice;
