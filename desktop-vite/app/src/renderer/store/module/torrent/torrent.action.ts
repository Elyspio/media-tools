import { TorrentState } from "./torrent.types";
import { createActionGenerator } from "../../utils/utils.actions";

const createAction = createActionGenerator("torrent");

export const setAddingTorrent = createAction<TorrentState["adding"]>("set-adding-torrent");
export const setQBittorrentIsStarted = createAction<TorrentState["isQbittorrentStarted"]>("set-qBittorrent-is-started");
