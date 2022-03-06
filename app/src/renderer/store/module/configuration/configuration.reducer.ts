import { createReducer } from "@reduxjs/toolkit";
import { setConfig } from "./configuration.action";

import { Configuration, ConfigurationService } from "../../../../main/services/configuration/configuration.service";
import { container } from "../../../../main/services/dependency-injection/dependency-injection.container";

export interface ConfigurationRouter {
	current: Configuration;
}

const configurationService = container.get(ConfigurationService);

const defaultState: ConfigurationRouter = {
	current: configurationService.get(false) as Configuration,
};

export const reducer = createReducer<ConfigurationRouter>(defaultState, builder => {
	builder.addCase(setConfig, (state, action) => {
		state.current = action.payload;
		configurationService.set(action.payload);
	});
});
