import { createReducer } from '@reduxjs/toolkit';
import { setDownloadPercentage } from './action';

export interface ProgressState {
    download?: number
}

const defaultState: ProgressState = {};

export const reducer = createReducer<ProgressState>(defaultState, builder => {

    builder.addCase(setDownloadPercentage, ((state, action) => {
        state.download = action.payload
    }));
});
