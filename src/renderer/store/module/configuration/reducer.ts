import { createReducer } from '@reduxjs/toolkit';
import {  setConfig } from './action';
import {Services} from "../../../../main/services"
import { Configuration } from '../../../../main/services/configuration/configurationService';



export interface ConfigurationRouter {
    current: Configuration
}

const defaultState: ConfigurationRouter = {
    current: Services.configuration.get(false) as Configuration
};

export const reducer = createReducer<ConfigurationRouter>(defaultState, builder => {

    builder.addCase(setConfig, ((state, action) => {
        state.current = action.payload;
        Services.configuration.set(action.payload)
    }));

});
