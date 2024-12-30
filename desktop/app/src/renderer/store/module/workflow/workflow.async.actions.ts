import { createAsyncActionGenerator } from "@store/utils/utils.actions";
import { initConfig, watchWindowResize } from "@modules/configuration/configuration.async.actions";

const createAsyncThunk = createAsyncActionGenerator("workflow");

export const initApp = createAsyncThunk("init-app", async (_, { extra, dispatch }) => {
	dispatch(initConfig());
	dispatch(watchWindowResize());
});
