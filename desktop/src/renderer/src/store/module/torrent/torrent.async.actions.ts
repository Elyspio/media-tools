import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { TorrentService } from "@services/media/torrent.service";
import { NyaaTorrentItem } from "@shared/types/torrent.types";

const createAsyncThunk = createAsyncActionGenerator("torrent");

export const searchTorrents = createAsyncThunk("search", async (query: string) => {
	return await window.preload.ipc.send.torrent.nyaa.list(query);
});

export const sendTorrent = createAsyncThunk("send", async (item: NyaaTorrentItem, { extra }) => {
	const torrentService = getService(TorrentService, extra);

	if (item.torrentUrl) {
		await torrentService.addTorrentFromUrl(item.torrentUrl);
		return item.id;
	}

	throw new Error("torrent URL available for this entry");
});
