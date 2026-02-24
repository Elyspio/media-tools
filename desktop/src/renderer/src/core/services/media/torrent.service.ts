import { injectable } from "inversify";

@injectable()
export class TorrentService {
	async addTorrentFromUrl(torrentUrl: string) {
		await window.preload.ipc.send.torrent.qbittorrent.addFromUrl(torrentUrl);
	}
}
