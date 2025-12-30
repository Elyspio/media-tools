import { webContainer } from "@core/di/web.container";
import { DialogService } from "@services/electron/dialog.service";
import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import type { Media } from "@components/internal/encoder/type";
import type { FileInfo } from "@shared/types/dialog.types";

const createAsyncThunk = createAsyncActionGenerator("media");

export const selectFolderOrFiles = createAsyncThunk("select/folder", async (mode: "folder" | "files") => {
	const processService = webContainer.get(DialogService);
	return await processService.selectFolder(mode === "files");
});

export const setMedias = createAsyncThunk("set", async (files: FileInfo[]) => {
	files = files.filter((f) => f.type === "file");

	const probes = await Promise.all(files.map(async (f) => [f, await window.preload.ipc.send.process.ffmpeg.probe(f.path)] as const));

	return probes.map(
		([file, probe]): Media => ({
			file,
			property: probe,
		})
	);
});
