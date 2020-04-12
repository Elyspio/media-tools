import {createReducer} from "@reduxjs/toolkit"
import {setCurrent} from "./action"

export interface ComponentsState {
	selected?: string
}

const defaultState: ComponentsState = {
	selected: undefined
};

export const reducer = createReducer<ComponentsState>(defaultState, builder => {

	builder.addCase(setCurrent, ((state, action) => {
		state.selected = action.payload;
	}))
})
