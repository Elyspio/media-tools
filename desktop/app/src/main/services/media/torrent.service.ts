import { qbittorent } from "../../../config/media/torents.private";
import { QBittorrent } from "@ctrl/qbittorrent";
import { readFile } from "fs/promises";
import { injectable } from "inversify";


const client = new QBittorrent({
	baseUrl: qbittorent.uri,
	password: qbittorent.password,
	username: qbittorent.login,
});

@injectable()
export class TorrentService {
	async add(torrent: string) {
		const read = await readFile(torrent);
		await client.addTorrent(read, { firstLastPiecePrio: "true" });
	}

	async list() {
		return client.listTorrents();
	}

	resume(hash: string) {
		return client.resumeTorrent(hash);
	}

	pause(hash: string) {
		return client.pauseTorrent(hash);
	}

	delete(hash: string) {
		return client.removeTorrent(hash, true);
	}
}
