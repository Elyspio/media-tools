import { createAction as _createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Encoder, Media, ProcessData } from "@components/internal/encoder/type";
import { ChildProcess } from "child_process";
import { StoreState } from "@store";
import { container } from "@/main/di/di.container";
import { ProcessService } from "@services/common/process.service";
import { stopConverting } from "../encoder/encoder.action";

const createAction = <T>(name: string) => _createAction<T>(`media/${name}`);

export const setMedias = createAction<Media[]>("setMedia");
export const setFormat = createAction<Encoder["value"]["ffmpeg"]>("setFormat");
export const setFFmpegInstalled = createAction<boolean>("setFFmpegInstalled");
export const setProcesses = createAction<ProcessData[]>("setProcess");
export const setProgress = createAction<ProcessData>("setProgress");
export const setCurrentProcess = createAction<ChildProcess | undefined>("setCurrentProcess");

export const encodingProcess: { current?: ChildProcess } = {};

export const stopCurrentProcess = createAsyncThunk("media/stopCurrentProcess", (arg, thunkAPI) => {
	const processService = container.get(ProcessService);
	const { encoder } = thunkAPI.getState() as StoreState;
	if (encoder.currentProcessPid && encodingProcess.current) {
		processService.kill(encodingProcess.current!);
		thunkAPI.dispatch(setCurrentProcess(undefined));
		thunkAPI.dispatch(setMedias([]));
		thunkAPI.dispatch(setProcesses([]));
		stopConverting.ref = true;
	}
});
