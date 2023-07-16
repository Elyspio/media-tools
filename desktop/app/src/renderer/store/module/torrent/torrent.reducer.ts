import { createSlice } from "@reduxjs/toolkit";
import { TorrentState } from "./torrent.types";
import { setAddingTorrent, setQBittorrentIsStarted } from "./torrent.action";
import { getTorrents } from "./torrent.async.actions";

const defaultState: TorrentState = {
	isQbittorrentStarted: false,
	list: [],
};

const slice = createSlice({
	initialState: defaultState,
	name: "torrent",
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setAddingTorrent, (state, action) => {
			state.adding = action.payload;
		});
		addCase(setQBittorrentIsStarted, (state, action) => {
			state.isQbittorrentStarted = action.payload;
		});
		addCase(getTorrents.fulfilled, (state, action) => {
			state.list = action.payload;
		});
	},
});

export const { reducer } = slice;
