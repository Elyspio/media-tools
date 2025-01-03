import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import { getUriParam } from "../utils/url";
import { reducer as updaterReducer } from "./module/updater/updater.reducer";
import { reducer as screenShareReducer } from "./module/screen-share/screen-share.reducer";
import { reducer as torrentReducer } from "./module/torrent/torrent.reducer";
import { reducer as encoderReducer } from "./module/encoder/encoder.reducer";
import { reducer as routerReducer } from "./module/router/router.reducer";
import { reducer as renamerReducer } from "./module/renamer/renamer.reducer";
import { reducer as vpnReducer } from "./module/vpn/vpn.reducer";
import { reducer as weatherReducer } from "./module/weather/weather.reducer";
import { configurationReducer } from "./module/configuration/configuration.reducer";
import { mediaSlice } from "./module/media/media.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { container } from "@/main/di/di.container";
import { Container } from "inversify";
import { logErrorMiddleware } from "@store/middlewares/log-error.middleware";

const reducers = combineReducers({
	updater: updaterReducer,
	encoder: encoderReducer,
	routing: routerReducer,
	config: configurationReducer,
	screenShare: screenShareReducer,
	vpn: vpnReducer,
	media: mediaSlice.reducer,
	torrent: torrentReducer,
	renamer: renamerReducer,
	weather: weatherReducer,
});

export const store = configureStore({
	reducer: reducers,
	middleware: (defaults) =>
		defaults({
			serializableCheck: {
				ignoredActions: ["media/setCurrentProcess"],
			},
			thunk: {
				extraArgument: {
					container,
				},
			},
		}).concat(logger, logErrorMiddleware),
	preloadedState: getUriParam<any>("store", { json: true, remove: true }) ?? undefined,
});

export type StoreState = ReturnType<typeof store.getState>;

window.store = store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export type ExtraArgument = {
	container: Container;
};
