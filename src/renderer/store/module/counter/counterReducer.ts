
import {createReducer} from "@reduxjs/toolkit"
import {decrement, increment} from "./counterActions"
export interface CounterState {
    readonly value: number;
}

const defaultState: CounterState = {
    value: 0
};

export const reducer = createReducer<CounterState>(defaultState, builder => {
    builder.addCase(increment, (state, action) => {
        state.value += action.payload;
    })
    builder.addCase(decrement, (state, action) => {
        state.value -= action.payload;
    })
})
