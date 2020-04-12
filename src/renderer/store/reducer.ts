import { combineReducers } from 'redux';

import { CounterState, reducer as counterReducer } from './module/counter/counterReducer';

export interface RootState {
    counter: CounterState;
}

export const rootReducer = combineReducers<RootState | undefined>({
    counter: counterReducer
});
