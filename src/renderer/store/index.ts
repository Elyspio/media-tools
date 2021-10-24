import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {logger} from "redux-logger";
import {getUriParam} from "../util/url";
import {reducer as updaterReducer} from "./module/updater/reducer";
import {reducer as encoderReducer} from "./module/encoder/reducer";
import {reducer as routerReducer} from "./module/router/reducer";
import {reducer as vpnReducer} from "./module/vpn/reducer";
import {reducer as configurationRouter} from "./module/configuration/reducer";
import {mediaSlice} from "./module/media/media.reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
	reducer: {
		updater: updaterReducer,
		encoder: encoderReducer,
		routing: routerReducer,
		config: configurationRouter,
		vpn: vpnReducer,
		media: mediaSlice.reducer
	},
	devTools: true,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["media/setCurrentProcess"]
			}
		}),
		logger
	],
	preloadedState: getUriParam("store", {json: true, remove: true}) ?? undefined
});

export type StoreState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
