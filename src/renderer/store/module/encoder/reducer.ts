import { createReducer } from '@reduxjs/toolkit';
import { setOnFinishAction, setProcessStatus, updateProcessPercentage } from './action';


export const onFinishActionList = <const>["Sleep", "Shutdown", "Hibernate", "Lock", "None"]


export interface EncoderState {
    onFinishAction?: typeof onFinishActionList[number],
    processes?: {
        finished: number,
        total: number
    }
}

const defaultState: EncoderState = {
    onFinishAction: "None"
};

export const reducer  = createReducer<EncoderState>(defaultState, builder => {

    builder.addCase(setOnFinishAction, ((state, action) => {
        state.onFinishAction = action.payload;
    }));
    builder.addCase(setProcessStatus, ((state, action) => {
        state.processes = action.payload;
    }));
    builder.addCase(updateProcessPercentage, ((state, action) => {
        if (state.processes) {
            state.processes = {
                ...state.processes,
                finished: action.payload
            };
        }
    }));
});
