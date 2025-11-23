import { EncoderState } from "./encoder.reducer";
import { setProgress } from "../media/media.action";
import { Media } from "@components/internal/encoder/type";
import { MediaService } from "@services/media/media.service";
import { Dispatch } from "redux";
import { createActionGenerator, createAsyncActionGenerator, getServices } from "../../utils/utils.actions";
import { setCurrentProcess } from "@modules/process/process.actions";
import { ExtraArgument, StoreState } from "@store";
import FilesService from "@services/files/files.service";
import { PathService } from "@services/files/path.service";

const createAction = createActionGenerator("encoder");
const createAsyncThunk = createAsyncActionGenerator("encoder");

export const setOnFinishAction = createAction<EncoderState["onFinishAction"]>("setOnFinishAction");
export const setProcessStatus = createAction<EncoderState["processes"]>("setProcessStatus");
export const updateProcessPercentage = createAction<number>("updateProcessPercentage");

export async function runOnFinishAction() {
	// const electronService = webContainer.get(DialogService);
	// const notification = new Notification("Affiche un nouvel écran", {});
	// notification.onclick = () => {
	// 	electronService.createWindow(
	// 		"/encoder/recap",
	// 		{
	// 			title: "Encoder action summary",
	// 			top: true,
	// 			modal: true,
	// 		},
	// 		{
	// 			width: 400,
	// 			height: 300,
	// 			maxHeight: 300,
	// 			maxWidth: 400,
	// 			alwaysOnTop: true,
	// 		}
	// 	);
	// };
}

export const stopConverting = {
	ref: false,
};

export const convert = createAsyncThunk("encoder/convert", async (_, { getState, dispatch, extra }) => {
	const {
		media: { process: processes },
	} = getState();

	const services = getServices(
		{
			files: FilesService,
			path: PathService,
		},
		extra
	);

	for (const { media } of processes) {
		if (stopConverting.ref) return;
		const output = await encodeFile({ dispatch, extra, getState }, media);
		const old = services.path.join(services.path.dirname(media.file.path), "old");
		await services.files.ensureDir(old);
		await services.files.move(media.file.path, services.path.join(old, media.file.name));
		await services.files.move(output, media.file.path);
	}
	stopConverting.ref = false;

	await runOnFinishAction();
});

const encodeFile = async ({ extra, dispatch, getState }: { extra: ExtraArgument; dispatch: Dispatch; getState: () => StoreState }, media: Media) => {
	const state = getState();
	const {
		encoder,
		media: { process: processes },
	} = state;

	const process = processes.find((p) => p.media.file.path === media.file.path);

	if (!process) throw new Error(`Invalid State, could not found in store a media with type="${media.file.path}"`);

	dispatch(setProgress({ ...process, percentage: 0 }));

	const services = getServices({ media: MediaService, path: PathService }, extra);

	const outputPath = services.path.join(services.path.dirname(media.file.path), "current.mkv");

	const pid = await services.media.convert(media, encoder.format, { outputPath: outputPath });

	return new Promise<string>((resolve) => {
		dispatch(setCurrentProcess({ pid }));

		const interval = setInterval(() => {
			const state = getState();
			if (state.process.current !== pid) {
				clearInterval(interval);
				return resolve(outputPath);
			}
		}, 100);
	});
};
