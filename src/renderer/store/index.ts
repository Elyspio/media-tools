import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer, StoreState } from './reducer';
import { logger } from 'redux-logger';
import { getUriParam } from '../util/url';


export const store = configureStore<StoreState>({
    reducer: rootReducer,
    // @ts-ignore
    middleware: [...getDefaultMiddleware(), logger],
    preloadedState: getUriParam<StoreState>('store', { json: true, remove: true }) ?? undefined
});

