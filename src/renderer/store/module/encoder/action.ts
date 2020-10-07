import { createAction as _createAction } from '@reduxjs/toolkit';
import { EncoderState } from './reducer';


const createAction = <T>(type: string) => _createAction<T>(`encoder/${type}`);

export const setOnFinishAction = createAction<EncoderState['onFinishAction']>('setOnFinishAction');
export const setProcessStatus = createAction<EncoderState['processes']>('setProcessStatus');
export const updateProcessPercentage = createAction<number>('updateProcessPercentage');
