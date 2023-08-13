import { createAsyncActionGenerator, getService, getServices } from "../../utils/utils.actions";
import { FilesService } from "@services/files/files.service";
import { SystemService } from "@services/system/system.service";
import { setAddingTorrent, setQBittorrentIsStarted } from "./torrent.action";
import { TorrentService } from "@services/media/torrent.service";
import { toast } from "react-toastify";
import { ProcessService } from "@services/common/process.service";
import { Torrent } from "@ctrl/qbittorrent";

const createAsyncThunk = createAsyncActionGenerator("torrent");

let stopWatchingFolder: () => void;

export const watchNewTorrents = createAsyncThunk("watch-new", async (_, { extra, dispatch }) => {
	const services = getServices(
		{
			files: FilesService,
			system: SystemService,
		},
		extra
	);

	const downloadFolder = await services.system.getDownloadFolder();
	stopWatchingFolder = services.files.watch(downloadFolder, (filename: string) => {
		if (filename.endsWith(".torrent")) {
			dispatch(setAddingTorrent(filename));
		}
	});
});

export const stopWatchNewTorrents = createAsyncThunk("stop-watch-new", async () => {
	if (stopWatchingFolder) stopWatchingFolder();
});

export const openTorrentBrowser = createAsyncThunk("open-browser", async (_, { extra }) => {
	const services = getServices(
		{
			system: SystemService,
		},
		extra
	);

	await services.system.open("https://yggtorrent.li/");
});

export const downloadTorrent = createAsyncThunk("download", async (_, { extra, getState }) => {
	const state = getState();

	const filename = state.torrent.adding!;

	const services = getServices(
		{
			torrent: TorrentService,
		},
		extra
	);

	await toast.promise(services.torrent.add(filename), {
		success: `Starting to download ${filename}`,
	});
});

export const startQBittorrent = createAsyncThunk("start-qbittorrent", async (_, { extra }) => {
	{
		const services = getServices(
			{
				process: ProcessService,
			},
			extra
		);

		await services.process.spawnAsync("qbittorrent");
	}
});

export const checkQBittorrentProcess = createAsyncThunk("check-qbittorrent-process", async (_, { extra, dispatch }) => {
	const systemService = getService(SystemService, extra);
	const started = await systemService.isAppStarted("qbittorrent");
	dispatch(setQBittorrentIsStarted(started));
});

export const getTorrents = createAsyncThunk("get", async (_, { extra }) => {
	const torrentService = getService(TorrentService, extra);

	return torrentService.list();
});

type UpdateTorrentParams = {
	mode: "resume" | "pause" | "delete";
	hash: Torrent["hash"];
};

export const updateTorrent = createAsyncThunk("update", async ({ mode, hash }: UpdateTorrentParams, { extra, dispatch }) => {
	const torrentService = getService(TorrentService, extra);

	const fns: Record<UpdateTorrentParams["mode"], (hash: string) => Promise<any>> = {
		delete: torrentService.delete,
		pause: torrentService.pause,
		resume: torrentService.delete,
	};

	await fns[mode](hash);

	await dispatch(getTorrents());
});
