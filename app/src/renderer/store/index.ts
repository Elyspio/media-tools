import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { getUriParam } from "../utils/url";
import { reducer as updaterReducer } from "./module/updater/updater.reducer";
import { reducer as screenShareReducer } from "./module/screen-share/screen-share.reducer";
import { reducer as encoderReducer } from "./module/encoder/encoder.reducer";
import { reducer as routerReducer } from "./module/router/router.reducer";
import { reducer as vpnReducer } from "./module/vpn/vpn.reducer";
import { reducer as configurationRouter } from "./module/configuration/configuration.reducer";
import { mediaSlice } from "./module/media/media.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: {
		updater: updaterReducer,
		encoder: encoderReducer,
		routing: routerReducer,
		config: configurationRouter,
		screenShare: screenShareReducer,
		vpn: vpnReducer,
		media: mediaSlice.reducer,
	},
	devTools: true,
	middleware: defaults =>
		defaults({
			serializableCheck: {
				ignoredActions: ["media/setCurrentProcess"],
			},
		}).concat(logger),
	preloadedState: getUriParam<any>("store", { json: true, remove: true }) ?? undefined,
});

export type StoreState = ReturnType<typeof store.getState>;

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
