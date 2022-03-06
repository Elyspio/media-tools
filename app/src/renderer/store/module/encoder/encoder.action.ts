import { createAction as _createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { EncoderState } from "./encoder.reducer";
import { DialogService } from "../../../../main/services/electron/dialog.service";
import { container } from "../../../../main/services/dependency-injection/dependency-injection.container";
import path from "path";
import * as fs from "fs-extra";
import { StoreState } from "../../index";
import { setCurrentProcess, setProgress } from "../media/media.action";
import { Media } from "../../../components/modules/internal/encoder/type";
import { MediaService } from "../../../../main/services/media/media.service";
import { Dispatch } from "redux";
import { MediaState } from "../media/media.reducer";

const createAction = <T>(type: string) => _createAction<T>(`encoder/${type}`);

export const setOnFinishAction = createAction<EncoderState["onFinishAction"]>("setOnFinishAction");
export const setProcessStatus = createAction<EncoderState["processes"]>("setProcessStatus");
export const updateProcessPercentage = createAction<number>("updateProcessPercentage");

export async function runOnFinishAction() {
	const electronService = container.get(DialogService);
	const notification = new Notification("Affiche un nouvel écran", {});

	notification.onclick = () => {
		electronService.createWindow(
			"/encoder/recap",
			{
				title: "Encoder action summary",
				top: true,
				modal: true,
			},
			{
				width: 400,
				height: 300,
				maxHeight: 300,
				maxWidth: 400,
				alwaysOnTop: true,
			}
		);
	};
}

export let stopConverting = {
	ref: false,
};

export const convert = createAsyncThunk("encoder/convert", async (_, { getState, dispatch }) => {
	const {
		encoder,
		media: { process: processes },
	} = getState() as StoreState;

	for (const { media } of processes) {
		if (stopConverting.ref) return;
		const output = await encodeFile(dispatch, encoder, processes, media);
		const old = path.join(path.dirname(media.file.path), "old");
		await fs.ensureDir(old);
		await fs.move(media.file.path, path.join(old, media.file.name));
		await fs.move(output, media.file.path);
	}
	stopConverting.ref = false;

	await runOnFinishAction();
});

const encodeFile = (dispatch: Dispatch, encoder: EncoderState, processes: MediaState["process"], media: Media) => {
	return new Promise<string>(async resolve => {
		const process = processes.find(p => p.media.file.path === media.file.path);

		if (!process) throw `Invalid State, could not found in store a media with type="${media.file.path}"`;

		dispatch(setProgress({ ...process, percentage: 0 }));

		const outputPath = path.join(path.dirname(media.file.path), "current.mkv");
		const [s, createdProcess] = await new MediaService().convert(media, encoder.format, { outputPath: outputPath });

		dispatch(setCurrentProcess(createdProcess));

		s.on("progress", async percentage => {
			console.info("receiving progress", percentage);
		});

		s.on("finished", async () => {
			dispatch(setProgress({ ...process, percentage: 100 }));
			resolve(outputPath);
		});
	});
};
;