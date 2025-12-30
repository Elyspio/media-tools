import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { webContainer } from "@core/di/web.container";
import { ProcessService } from "@services/common/process.service";
import type { StoreState } from "@store";

const createAsyncThunk = createAsyncActionGenerator("media");

export const stopCurrentProcess = createAsyncThunk("media/stopCurrentProcess", async (_, { getState }) => {
	const processService = webContainer.get(ProcessService);
	const state = getState();
	if (state.process.current) {
		await processService.kill(state.process.current);
	}
});
export function waitProcessExits(getState: () => StoreState, pid: string): Promise<void> {
	return new Promise<void>((resolve, reject) => {
		const timeout = setInterval(() => {
			const state = getState();

			const exitStatus = state.process.byPids[pid].exitStatus;

			if (exitStatus === undefined) return;

			clearInterval(timeout);

			if (exitStatus === 0) {
				resolve();
			} else reject(new Error(`Exit status ${exitStatus}`));
		}, 500);
	});
}
