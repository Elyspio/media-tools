import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./module/theme/theme.reducer";
import { authenticationReducer } from "./module/authentication/authentication.reducer";
import { container } from "../core/di";
import { screenShareReducer } from "./module/screen-share/screen-share.reducer";
import { createRouterMiddleware, createRouterReducerMapObject } from "@lagunovsky/redux-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const store = configureStore({
	reducer: {
		theme: themeReducer,
		authentication: authenticationReducer,
		screenShare: screenShareReducer,
		...createRouterReducerMapObject(history),
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: { container } as ExtraArgument } }).prepend(routerMiddleware),
});
export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtraArgument = { container: typeof container };

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;
