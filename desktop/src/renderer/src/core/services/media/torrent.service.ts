import { injectable } from "inversify";
import { QBittorrent } from "@ctrl/qbittorrent";
import { qbittorrentConfig } from "@/config/networks/torrent";

@injectable()
export class TorrentService {
	private client = new QBittorrent({
		baseUrl: qbittorrentConfig.baseUrl,
		username: qbittorrentConfig.username,
		password: qbittorrentConfig.password,
	});

	async addMagnet(magnet: string) {
		await this.client.addMagnet(magnet, { firstLastPiecePrio: "true" });
	}

	async addTorrentFromUrl(torrentUrl: string) {
		const res = await fetch(torrentUrl);

		if (!res.ok) throw new Error(`Failed to download torrent file (${res.status})`);

		const buffer = new Uint8Array(await res.arrayBuffer());
		await this.client.addTorrent(buffer, { firstLastPiecePrio: "true" });
	}

	list() {
		return this.client.listTorrents({ limit: 50 });
	}

	resume(hash: string) {
		return this.client.resumeTorrent(hash);
	}

	pause(hash: string) {
		return this.client.pauseTorrent(hash);
	}

	delete(hash: string, deleteFiles = true) {
		return this.client.removeTorrent(hash, deleteFiles);
	}
}
