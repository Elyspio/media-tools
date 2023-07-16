import { Torrent } from "@ctrl/qbittorrent";

export interface TorrentState {
	/**
	 * Filepath of a new .torrent
	 */
	adding?: string;
	/**
	 * If qBittorrent process is started
	 */
	isQbittorrentStarted: boolean;

	list: Torrent[];
}