import { EncoderState } from "./encoder.reducer";
import { DialogService } from "@services/electron/dialog.service";
import { container } from "@/main/di/di.container";
import path from "path";
import { StoreState } from "@store";
import { setCurrentProcess, setProgress } from "../media/media.action";
import { Media } from "@components/internal/encoder/type";
import { MediaService } from "@services/media/media.service";
import { Dispatch } from "redux";
import { MediaState } from "../media/media.reducer";
import { createActionGenerator, createAsyncActionGenerator, getServices } from "../../utils/utils.actions";
import { FilesService } from "@services/files/files.service";

const createAction = createActionGenerator("encoder");
const createAsyncThunk = createAsyncActionGenerator("encoder");

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
			},
		);
	};
}

export const stopConverting = {
	ref: false,
};

export const convert = createAsyncThunk("encoder/convert", async (_, { getState, dispatch, extra }) => {
	const {
		encoder,
		media: { process: processes },
	} = getState() as StoreState;

	const services = getServices(
		{
			files: FilesService,
		},
		extra,
	);

	for (const { media } of processes) {
		if (stopConverting.ref) return;
		const output = await encodeFile(dispatch, encoder, processes, media);
		const old = path.join(path.dirname(media.file.path), "old");
		await services.files.ensureDir(old);
		await services.files.move(media.file.path, path.join(old, media.file.name));
		await services.files.move(output, media.file.path);
	}
	stopConverting.ref = false;

	await runOnFinishAction();
});

const encodeFile = async (dispatch: Dispatch, encoder: EncoderState, processes: MediaState["process"], media: Media) => {
	const process = processes.find((p) => p.media.file.path === media.file.path);

	if (!process) throw `Invalid State, could not found in store a media with type="${media.file.path}"`;

	dispatch(setProgress({ ...process, percentage: 0 }));

	const outputPath = path.join(path.dirname(media.file.path), "current.mkv");
	const [s, createdProcess] = await new MediaService().convert(media, encoder.format, { outputPath: outputPath });

	return new Promise<string>((resolve) => {
		dispatch(setCurrentProcess(createdProcess));

		s.on("progress", (percentage) => {
			console.info("receiving progress", percentage);
		});

		s.on("finished", () => {
			dispatch(setProgress({ ...process, percentage: 100 }));
			resolve(outputPath);
		});
	});
};
