import { ipcRendererWrapper } from "./preload.ipc.wrapper";

export function getIpcReceiver() {
	return {
		app: {
			deeplink: {
				handle: (callback: (link: string) => void) => {
					ipcRendererWrapper.on("app:deeplink:handle", (_, link) => {
						callback(link);
					});
				},
			},
			screen: {
				toggleFullScreen: (callback: (isMaximized: boolean) => void) => {
					ipcRendererWrapper.on("app:screen:toggle-full-screen", (_, isMaximized) => {
						callback(isMaximized);
					});
				},
			},
		},
		process: {
			spawn: {
				stdout: (callback: (pid: string, data: string) => void) => {
					ipcRendererWrapper.on("process:spawn:stdout", (_, pid, data) => {
						callback(pid, data);
					});
				},
				stderr: (callback: (pid: string, data: string) => void) => {
					ipcRendererWrapper.on("process:spawn:stderr", (_, pid, data) => {
						callback(pid, data);
					});
				},
				exit: (callback: (pid: string, code: number | null) => void) => {
					ipcRendererWrapper.on("process:spawn:exit", (_, pid, code) => {
						callback(pid, code);
					});
				},
			},
		},
		update: {
			/**
			 * Écoute le process main pour recevoir la disponibilité d'une mise à jour
			 * @param callback
			 */
			available: (callback: (version: string) => void) => {
				ipcRendererWrapper.on("update:available", (_, version) => {
					callback(version);
				});
			},
			/**
			 * Event envoyé lors de la fin du téléchargement de la mise à jour
			 */
			downloaded: (callback: () => void) => {
				ipcRendererWrapper.on("update:download:end", () => {
					callback();
				});
			},
			/**
			 * Event envoyé lors de la progression du téléchargement de la mise à jour
			 */
			downloading: (callback: (progress: number) => void) => {
				ipcRendererWrapper.on("update:download:progress", (_, progress) => {
					callback(progress);
				});
			},
		},
	};
}

export type PreloadReceivedIpc = ReturnType<typeof getIpcReceiver>;
