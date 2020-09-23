import { createReducer } from '@reduxjs/toolkit';
import { setDownloadPercentage, setServerLatestVersion } from './action';

export interface UpdateSatte {
    download?: number,
    serverVersion?: string
}

const defaultState: UpdateSatte = {};

export const reducer = createReducer<UpdateSatte>(defaultState, builder => {

    builder.addCase(setDownloadPercentage, ((state, action) => {
        state.download = action.payload;
    }));
    builder.addCase(setServerLatestVersion, ((state, action) => {
        state.serverVersion = action.payload;
    }));
});
