import { NyaaTorrentItem } from "@shared/types/torrent.types";

export type TorrentState = {
	query: string;
	results: GetTorrentGroupedResult[];
	parseEpisodeInfos: boolean;
	loading: boolean;
	sendingId: string | null;
};

export type GetTorrentGroupedResult = {
	template: string;
	min?: number;
	max?: number;
	data: NyaaTorrentItem[];
};
