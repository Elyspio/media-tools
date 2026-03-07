import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { setupFfmpeg } from "@modules/encoder/encoder.async.actions";
import type { Encoder } from "@shared/types/ffmpeg.types";

export interface EncoderState {
	processes: {
		/**
		 * Mapping of media path to progress percentage (0-100)
		 */
		progress: Record<string, number>;
		/**
		 * Mapping of media path to process id
		 */
		pids: Record<string, string>;
	};
	ffmpeg?: {
		encoders: Encoder[];
	};
	current: {
		pids: string[];
		format?: string;
	};
}

const defaultState: EncoderState = {
	processes: {
		progress: {},
		pids: {},
	},
	current: {
		pids: [],
	},
};

const slice = createSlice({
	name: "encoder",
	initialState: defaultState,
	reducers: {
		setFormat: (state, action: PayloadAction<string | undefined>) => {
			state.current.format = action.payload;
		},

		removeFileProcess: (state, { payload: { pids } }: PayloadAction<{ pids: string[] }>) => {
			state.current.pids = state.current.pids.filter((p) => !pids.includes(p));
		},

		setFileProcesses: (state, { payload: { pid, path } }: PayloadAction<{ path: string; pid: string }>) => {
			state.current.pids.push(pid);
			state.processes.pids[path] = pid;
		},
		setProcessProgress: (state, action: PayloadAction<{ path: string; value: number }>) => {
			state.processes.progress[action.payload.path] = action.payload.value;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setupFfmpeg.fulfilled, (state, action) => {
			if (!action.payload.isAvailable) {
				state.ffmpeg = undefined;
				return;
			}

			const videoEncoders = action.payload.encoders!.filter((e) => e.type === "video");

			state.ffmpeg = {
				encoders: videoEncoders,
			};
		});
	},
});

export const reducer = slice.reducer;

export const { setProcessProgress, setFileProcesses, setFormat, removeFileProcess } = slice.actions;
