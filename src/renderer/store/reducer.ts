import { combineReducers } from 'redux';

import { ComponentsState, reducer as componentsReducer } from './module/components/reducer';
import { reducer as updaterReducer, UpdateState } from './module/updater/reducer';
import { EncoderState, reducer as encoderReducer } from './module/encoder/reducer';

export interface StoreState {
    components: ComponentsState;
    updater: UpdateState;
    encoder: EncoderState
}

export const rootReducer = combineReducers<StoreState>({
    components: componentsReducer,
    updater: updaterReducer,
    encoder: encoderReducer
});
