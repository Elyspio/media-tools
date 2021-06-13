const {remote} = require("electron")
const {QBittorrent} = remote.require('@ctrl/qbittorrent');
import {qbittorent} from "../../../config/media/torents.private";
import {QBittorrent as IQBittorrent} from "@ctrl/qbittorrent";

const client: IQBittorrent = new QBittorrent({
	baseUrl: qbittorent.uri,
	password: qbittorent.password,
	username: qbittorent.login
});

export class TorrentService {

	async add(torrent: string) {
		await client.addTorrent(torrent, {firstLastPiecePrio: "true"})
	}

	async list() {
		return client.listTorrents();
	}

	start(hash: string) {
		return client.resumeTorrent(hash)
	}

	stop() {

	}
}
