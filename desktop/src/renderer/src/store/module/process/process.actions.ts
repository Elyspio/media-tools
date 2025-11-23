import { createActionGenerator } from "@store/utils/utils.actions";

const createAction = createActionGenerator("process");

export const addProcessStd = createAction<{
	pid: string;
	type: "stdout" | "stderr";
	data: string;
}>("std/add");

export const completeProcess = createAction<{
	pid: string;
}>("complete");

export const setCurrentProcess = createAction<{ pid: string } | undefined>("process");
