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
		pid?: string;
		format?: string;
	};
}

const defaultState: EncoderState = {
	processes: {
		progress: {},
		pids: {},
	},
	current: {},
};

const slice = createSlice({
	name: "encoder",
	initialState: defaultState,
	reducers: {
		setFormat: (state, action: PayloadAction<string | undefined>) => {
			state.current.format = action.payload;
		},
		setFileProcess: (state, action: PayloadAction<{ path: string; pid: string } | null>) => {
			if (!action.payload) {
				state.current.pid = undefined;
				return;
			}

			state.current.pid = action.payload.pid;
			state.processes.pids[action.payload.path] = action.payload.pid;
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

export const { setProcessProgress, setFileProcess, setFormat } = slice.actions;
