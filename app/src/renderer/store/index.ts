import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { getUriParam } from "../utils/url";
import { reducer as updaterReducer } from "./module/updater/updater.reducer";
import { reducer as encoderReducer } from "./module/encoder/encoder.reducer";
import { reducer as routerReducer } from "./module/router/router.reducer";
import { reducer as vpnReducer } from "./module/vpn/vpn.reducer";
import { reducer as configurationRouter } from "./module/configuration/configuration.reducer";
import { mediaSlice } from "./module/media/media.reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		updater: updaterReducer,
		encoder: encoderReducer,
		routing: routerReducer,
		config: configurationRouter,
		vpn: vpnReducer,
		media: mediaSlice.reducer,
	},
	devTools: true,
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["media/setCurrentProcess"],
			},
		}),
		logger,
	],
	preloadedState: getUriParam("store", { json: true, remove: true }) ?? undefined,
});

export type StoreState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
