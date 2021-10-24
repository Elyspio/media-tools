import { createAction as _createAction } from "@reduxjs/toolkit";
import { EncoderState } from "./reducer";
import { DialogService } from "../../../../main/services/electron/dialog.service";
import { DependencyInjectionKeys } from "../../../../main/services/dependency-injection/dependency-injection.keys";
import { container } from "../../../../main/services/dependency-injection/dependency-injection.container";

const createAction = <T>(type: string) => _createAction<T>(`encoder/${type}`);

export const setOnFinishAction = createAction<EncoderState["onFinishAction"]>("setOnFinishAction");
export const setProcessStatus = createAction<EncoderState["processes"]>("setProcessStatus");
export const updateProcessPercentage = createAction<number>("updateProcessPercentage");

const electronService = container.get<DialogService>(DependencyInjectionKeys.electron.dialog);

export async function runOnFinishAction() {
	const notification = new Notification("Affiche un nouvel écran", {});

	notification.onclick = () => {
		electronService.createWindow(
			"/encoder/recap",
			{
				title: "Encoder action summary",
				top: true,
				modal: true,
			},
			{
				width: 400,
				height: 300,
				maxHeight: 300,
				maxWidth: 400,
				alwaysOnTop: true,
			}
		);
	};
}
