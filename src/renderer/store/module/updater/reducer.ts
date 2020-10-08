import { createReducer } from '@reduxjs/toolkit';
import { setDownloadPercentage, setServerLatestVersion } from './action';

export interface UpdateState {
    download?: number,
    serverVersion?: string
}

const defaultState: UpdateState = {};

export const reducer = createReducer<UpdateState>(defaultState, builder => {

    builder.addCase(setDownloadPercentage, ((state, action) => {
        state.download = action.payload;
    }));
    builder.addCase(setServerLatestVersion, ((state, action) => {
        state.serverVersion = action.payload;
    }));
});
