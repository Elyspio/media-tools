import {qbittorent} from "../../../config/media/torents.private";
import {QBittorrent as IQBittorrent} from "@ctrl/qbittorrent";
import {readFile} from "fs/promises";

const {remote} = require("electron")
const {QBittorrent} = remote.require('@ctrl/qbittorrent');

const client: IQBittorrent = new QBittorrent({
	baseUrl: qbittorent.uri,
	password: qbittorent.password,
	username: qbittorent.login
});

export class TorrentService {

	async add(torrent: string) {
		const read = await readFile(torrent);
		await client.addTorrent(read, {firstLastPiecePrio: "true"})
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
