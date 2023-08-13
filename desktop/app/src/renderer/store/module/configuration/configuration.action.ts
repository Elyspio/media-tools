import { createAction as _createAction } from "@reduxjs/toolkit";
import { Configuration } from "@services/configuration/configuration.service";
import { createAsyncActionGenerator, getServices } from "../../utils/utils.actions";
import { WindowService } from "@services/electron/window.service";

const createAsyncThunk = createAsyncActionGenerator("configuration");

const createAction = <T>(type: string) => _createAction<T>(`configuration/${type}`);

export const setConfig = createAction<Configuration>("setConfig");

export const resetDimensions = createAsyncThunk("reset-dimensions", async (_, { extra }) => {
	const services = getServices({ window: WindowService }, extra);

	services.window.resetDimensions();
});
