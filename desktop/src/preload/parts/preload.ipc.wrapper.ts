import { IpcHandledEvents } from "@shared/ipc/ipc.handled.events";
import { ipcRenderer } from "electron";
import { IpcSentEvents } from "@shared/ipc/ipc.sent.events";

export type SkipFirst<T extends any[]> = T extends [any, ...infer U] ? U : never;

export const ipcRendererWrapper = {
	invoke<Channel extends keyof IpcHandledEvents>(channel: Channel, ...args: SkipFirst<Parameters<IpcHandledEvents[Channel]>>): Promise<ReturnType<IpcHandledEvents[Channel]>> {
		console.log("ipcRendererWrapper.invoking", channel, ...args);
		return ipcRenderer.invoke(channel, ...args);
	},

	on<Channel extends keyof IpcSentEvents>(channel: Channel, listener: (...args: Parameters<IpcSentEvents[Channel]>) => void) {
		ipcRenderer.on(channel, (_, ...args) => {
			console.log("ipcRendererWrapper.on", channel, ...args);
			return (listener as any)(_, ...args);
		});
	},
};
