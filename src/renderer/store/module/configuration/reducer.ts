import {createReducer} from "@reduxjs/toolkit";
import {setConfig} from "./action";

import {Configuration, ConfigurationService} from "../../../../main/services/configuration/configuration.service";
import {DependencyInjectionKeys} from "../../../../main/services/dependency-injection/dependency-injection.keys";
import {container} from "../../../../main/services/dependency-injection/dependency-injection.container";


export interface ConfigurationRouter {
	current: Configuration
}


const configurationService = container.get<ConfigurationService>(DependencyInjectionKeys.configuration);


const defaultState: ConfigurationRouter = {
	current: configurationService.get(false) as Configuration
};

export const reducer = createReducer<ConfigurationRouter>(defaultState, builder => {

	builder.addCase(setConfig, ((state, action) => {
		state.current = action.payload;
		configurationService.set(action.payload);
	}));

});
