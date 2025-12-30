import { createAsyncActionGenerator, getService } from "@store/utils/utils.actions";
import { webContainer } from "@core/di/web.container";
import { FfmpegService } from "@services/media/ffmpeg.service";
import type { Encoder } from "@shared/types/ffmpeg.types";
import { waitProcessExits } from "@modules/process/process.async.actions";
import { setFileProcess, setProcessProgress } from "@modules/encoder/encoder.reducer";
import FilesService from "@services/files/files.service";
import { PathService } from "@services/files/path.service";
import type { Media } from "@components/internal/encoder/type";

const createAsyncThunk = createAsyncActionGenerator("encoder");

type IgnoreAlreadyConvertedFilesParams = {
	format: string;
	files: Media[];
};

/**
 * Ignore files that are already converted to the target format.
 * Marks their progress as 100%
 * @warning This function only supports hevc, h264 and av1 for now
 * @warning Files will not be modified nor have an associated process
 */
export const ignoreAlreadyConvertedFiles = createAsyncThunk("convert", async ({ files, format }: IgnoreAlreadyConvertedFilesParams, { dispatch }) => {
	let alreadyConverted: Media[] = [];

	if (format.includes("hevc")) {
		alreadyConverted = files.filter((f) => f.property.streams.find((s) => s.codec_name === "hevc"));
	}

	if (format.includes("h264")) {
		alreadyConverted = files.filter((f) => f.property.streams.find((s) => s.codec_name === "h264"));
	}

	if (format.includes("av1")) {
		alreadyConverted = files.filter((f) => f.property.streams.find((s) => s.codec_name === "av1"));
	}

	if (alreadyConverted.length > 0) {
		for (const media of alreadyConverted) {
			dispatch(setProcessProgress({ path: media.file.path, value: 1 }));
		}
	}

	return alreadyConverted;
});

/**
 * Convert media files to the selected format
 * @throws Error if no format is selected
 * @throws Error if no files are selected
 */
export const convert = createAsyncThunk("convert", async (_, { getState, dispatch, extra }) => {
	const state = getState();

	const format = state.encoder.current.format;

	if (!format) throw new Error("Unknown format");

	const ffmpegService = getService(FfmpegService, extra);
	const fileService = getService(FilesService, extra);
	const pathService = getService(PathService, extra);

	const files = state.media.data;

	if (files.length === 0) throw new Error("No files to convert");

	// region Skip already converted files
	const alreadyConverted = await dispatch(
		ignoreAlreadyConvertedFiles({
			format,
			files,
		})
	).unwrap();

	// endregion Skip already converted files

	for (const file of files.filter((f) => !alreadyConverted.includes(f))) {
		const outputPath = getConvertedFilePath(file.file.path);

		const pid = await ffmpegService.convert({
			format: { id: format },
			files: {
				input: file.file.path,
				output: outputPath,
			},
		});

		dispatch(setFileProcess({ path: file.file.path, pid }));

		const nbFrames = ffmpegService.extractNbFrames(file.property);

		const removeListener = window.preload.ipc.on.process.spawn.stderr((pid1, data) => {
			if (pid1 !== pid) return;

			const frame = ffmpegService.extractNbFrameProcessed(data);

			if (frame === null) return;

			const percentProgress = frame / nbFrames;

			dispatch(
				setProcessProgress({
					path: file.file.path,
					value: percentProgress,
				})
			);
		});

		await waitProcessExits(getState, pid);

		removeListener();

		// Move converted file to original location
		const originalDir = pathService.dirname(file.file.path);

		const oldDir = pathService.join(originalDir, "old");

		const oldPath = pathService.join(oldDir, pathService.filename(file.file.path));

		await fileService.move(file.file.path, oldPath);

		await fileService.move(outputPath, file.file.path);
	}

	dispatch(setFileProcess(null));
});

function getConvertedFilePath(filePath: string): string {
	const extensionIndex = filePath.lastIndexOf(".");

	if (extensionIndex === -1) {
		return `${filePath}_converted`;
	}

	const name = filePath.substring(0, extensionIndex);
	const extension = filePath.substring(extensionIndex);
	return `${name}_converted${extension}`;
}

export const setupFfmpeg = createAsyncThunk("ffmpeg/setup", async (): Promise<{ isAvailable: boolean; encoders?: Encoder[] }> => {
	const ffmpegService = webContainer.get(FfmpegService);

	const isAvailable = await ffmpegService.isAvailable();

	if (!isAvailable) {
		return {
			isAvailable: false,
		};
	}

	return {
		isAvailable: true,
		encoders: await ffmpegService.getEncoders(),
	};
});
