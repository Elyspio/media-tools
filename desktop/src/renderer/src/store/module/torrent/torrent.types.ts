import { NyaaTorrentItem } from "@shared/types/torrent.types";

export type TorrentState = {
	query: string;
	results: NyaaTorrentItem[];
	loading: boolean;
	sendingId: string | null;
};
