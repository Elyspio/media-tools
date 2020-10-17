import { createAction as _createAction } from '@reduxjs/toolkit';
import { EncoderState } from './reducer';
import { store } from '../../index';
import { Services } from '../../../../main/services';
import { delayBeforeRunningAction } from '../../../../config/encoder';


const createAction = <T>(type: string) => _createAction<T>(`encoder/${type}`);

export const setOnFinishAction = createAction<EncoderState['onFinishAction']>('setOnFinishAction');
export const setProcessStatus = createAction<EncoderState['processes']>('setProcessStatus');
export const updateProcessPercentage = createAction<number>('updateProcessPercentage');


let preventAction: NodeJS.Timeout | undefined = undefined;


export async function cancelOnFinishAction() {
    if (preventAction) {
        clearTimeout(preventAction);
    }
}

export async function runOnFinishAction(action?: EncoderState['onFinishAction']) {

    action ??= store.getState().encoder.onFinishAction;


    const notification = new Notification('Affiche un nouvel écran', {});

    const run = async () => {
        switch (action) {
            case 'Shutdown':
                await Services.system.shutdown();
                break;
            case 'Sleep':
                await Services.system.sleep();
                break;
            case 'Hibernate':
                await Services.system.hibernate();
                break;
            case 'Lock':
                await Services.system.lock();
                break;
        }
    };

    notification.onclick = () => {
        preventAction = setTimeout(run, delayBeforeRunningAction);
        Services.dialog.createWindow('/encoder/dialog/action');
    };
}
