import { createAsyncActionGenerator } from "../../common/common.actions";

const createAsyncThunk = createAsyncActionGenerator("workflow");

export const initApp = createAsyncThunk("initApp", (_, { dispatch }) => {
	// dispatch(silentLogin());
});
