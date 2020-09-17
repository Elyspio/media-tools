import { combineReducers } from 'redux';

import { ComponentsState, reducer as componentsReducer } from './module/components/reducer';

export interface StoreState {
    components: ComponentsState;
}

export const rootReducer = combineReducers<StoreState>({
    components: componentsReducer
});
