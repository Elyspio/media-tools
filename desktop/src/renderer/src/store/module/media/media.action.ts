import { Encoder, Media, ProcessData } from "@components/internal/encoder/type";
import { createActionGenerator } from "@store/utils/utils.actions";

const createAction = createActionGenerator("media");

export const setMedias = createAction<Media[]>("setMedia");
export const setFormat = createAction<Encoder["value"]["ffmpeg"]>("setFormat");
export const setFFmpegInstalled = createAction<boolean>("setFFmpegInstalled");
export const setProcesses = createAction<ProcessData[]>("setProcess");
export const setProgress = createAction<ProcessData>("setProgress");
