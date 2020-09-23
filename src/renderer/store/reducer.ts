import { combineReducers } from 'redux';

import { ComponentsState, reducer as componentsReducer } from './module/components/reducer';
import { UpdateSatte, reducer as updaterReducer } from './module/updater/reducer';

export interface StoreState {
    components: ComponentsState;
    updater: UpdateSatte;
}

export const rootReducer = combineReducers<StoreState>({
    components: componentsReducer,
    updater: updaterReducer
});
