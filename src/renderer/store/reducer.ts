import { combineReducers } from 'redux';

import { reducer as updaterReducer, UpdateState } from './module/updater/reducer';
import { EncoderState, reducer as encoderReducer } from './module/encoder/reducer';
import { RouterState , reducer as routerReducer } from './module/router/reducer';
import { ConfigurationRouter , reducer as configurationRouter } from './module/configuration/reducer';

export interface StoreState {
    updater: UpdateState;
    encoder: EncoderState;
    routing: RouterState,
    config: ConfigurationRouter
}

export const rootReducer = combineReducers<StoreState>({
    updater: updaterReducer,
    encoder: encoderReducer,
    routing: routerReducer,
    config: configurationRouter
});
