import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { setMedias, setProcesses } from "@modules/media/media.action";
import { webContainer } from "@core/di/web.container";
import { ProcessService } from "@services/common/process.service";
import { setCurrentProcess } from "@modules/process/process.actions";

const createAsyncThunk = createAsyncActionGenerator("media");

export const stopCurrentProcess = createAsyncThunk("media/stopCurrentProcess", async (_, { getState, dispatch }) => {
	const processService = webContainer.get(ProcessService);
	const state = getState();
	if (state.process.current) {
		await processService.kill(state.process.current);
		dispatch(setCurrentProcess(undefined));
		dispatch(setMedias([]));
		dispatch(setProcesses([]));
	}
});
