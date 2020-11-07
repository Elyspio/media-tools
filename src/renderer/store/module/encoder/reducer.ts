import { createReducer } from '@reduxjs/toolkit';
import { store } from '../..';
import { setOnFinishAction, setProcessStatus, updateProcessPercentage } from './action';
import { Services } from '../../../../main/services';


export const onFinishActionList = <const>['Sleep', 'Shutdown', 'Hibernate', 'Lock', 'None'];


export interface EncoderState {
    onFinishAction?: typeof onFinishActionList[number],
    processes?: {
        finished: number,
        total: number
    }
}

const defaultState: EncoderState = {
    onFinishAction: 'None'
};


export const getOnFinishAction = () => {

    const actions: { [key in typeof onFinishActionList[number]]: () => any } = {
        Hibernate: Services.system.hibernate,
        Lock: Services.system.lock,
        Shutdown: Services.system.shutdown,
        Sleep: Services.system.sleep,
        None: () => {
        }
    };

    return actions[store.getState().encoder.onFinishAction ?? 'None'];
};

export const reducer = createReducer<EncoderState>(defaultState, builder => {

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
