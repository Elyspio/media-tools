export enum AppBoardShow {
	external = "external",
	internal = "internal",
	hidden = "hidden",
}

export const version = window.preload.ipc.send.app.getPublicVersion();
