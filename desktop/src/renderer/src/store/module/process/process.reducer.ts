import { createSlice } from "@reduxjs/toolkit";
import { addProcessStd, completeProcess, setCurrentProcess } from "@modules/process/process.actions";

type ProcessState = {
	std: {
		[pid: string]: {
			stdout: string;
			stderr: string;
			completed: boolean;
		};
	};
	current?: string;
};
const initialState: ProcessState = {
	std: {},
};

export const processSlice = createSlice({
	name: "process",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addProcessStd, (state, action) => {
			const { pid, type, data } = action.payload;
			if (!state.std[pid]) {
				state.std[pid] = { stdout: "", stderr: "", completed: false };
			}
			state.std[pid][type] += data + "\n";
		});

		builder.addCase(completeProcess, (state, action) => {
			// Mark the process as completed
			// and clear the current std to free up memory
			state.std[action.payload.pid] = {
				stdout: "",
				stderr: "",
				completed: false,
			};
			state.current = undefined;
		});

		builder.addCase(setCurrentProcess, (state, action) => {
			state.current = action.payload?.pid;
		});
	},
});
