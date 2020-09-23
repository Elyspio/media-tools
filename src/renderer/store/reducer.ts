import { combineReducers } from 'redux';

import { ComponentsState, reducer as componentsReducer } from './module/components/reducer';
import { ProgressState, reducer as updaterReducer } from './module/updater/reducer';

export interface StoreState {
    components: ComponentsState;
    updater: ProgressState;
}

export const rootReducer = combineReducers<StoreState>({
    components: componentsReducer,
    updater: updaterReducer
});
