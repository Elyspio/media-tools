import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import {rootReducer, StoreState} from "./reducer"
import {logger} from "redux-logger"

export const store = configureStore<StoreState>({
	reducer: rootReducer,
	// @ts-ignore
	middleware: [...getDefaultMiddleware(), logger]
})

