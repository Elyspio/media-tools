import { createAction as _createAction } from "@reduxjs/toolkit";
import { EncoderState } from "./reducer";
import { Services } from "../../../../main/services";


const createAction = <T>(type: string) => _createAction<T>(`encoder/${type}`);

export const setOnFinishAction = createAction<EncoderState["onFinishAction"]>("setOnFinishAction");
export const setProcessStatus = createAction<EncoderState["processes"]>("setProcessStatus");
export const updateProcessPercentage = createAction<number>("updateProcessPercentage");


export async function runOnFinishAction() {

	const notification = new Notification("Affiche un nouvel écran", {});

	notification.onclick = () => {
		Services.electron.dialog.createWindow("/encoder/recap", {
				title: "Encoder action summary",
				top: true,
				modal: true
			}, {
				width: 400,
				height: 300,
				maxHeight: 300,
				maxWidth: 400,
				alwaysOnTop: true
			}
		);
	};

}
