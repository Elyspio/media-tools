import { ipcRendererWrapper } from "./preload.ipc.wrapper";
import { GetInformationKey, GetInformationResult } from "../../shared/ipc/ipc.handled.events";
import { appIpcSender } from "./ipc/sender/app.sender.ipc.preload";
import { LatestConfig } from "@shared/config/app.config";
import { ExecOptions, SpawnOptions } from "node:child_process";
import { GetFolderResult } from "@shared/types/dialog.types";
import { ExecResult, SpawnResult } from "@shared/types/process.types";
import { RmDirOptions } from "fs";
import { Stats } from "node:fs";
import { FfmpegConvertOptions } from "@shared/types/ffmpeg.types";

export function getIpcSender() {
	return {
		app: appIpcSender,

		config: {
			local: {
				async get() {
					return await ipcRendererWrapper.invoke("config:local:get");
				},
				async set(config: LatestConfig) {
					await ipcRendererWrapper.invoke("config:local:set", config);
				},
				async regenerate() {
					return await ipcRendererWrapper.invoke("config:local:regenerate");
				},
			},
		},
		dialog: {
			selectDirectory: async <WithFiles extends boolean>(returnsFiles: WithFiles) => {
				return (await ipcRendererWrapper.invoke("dialog:selectDirectory", returnsFiles)) as GetFolderResult<WithFiles>;
			},
		},
		process: {
			exec: async (command: string, args: string[], options: ExecOptions): Promise<ExecResult> => {
				return await ipcRendererWrapper.invoke("process:exec", command, args, options);
			},
			spawn: async (command: string, args: string[], options: SpawnOptions): Promise<SpawnResult> => {
				return await ipcRendererWrapper.invoke("process:spawn", command, args, options);
			},
			kill: async (pid: string, signal: NodeJS.Signals | number) => {
				return await ipcRendererWrapper.invoke("process:kill", pid, signal);
			},
			ffmpeg: {
				isAvailable: async () => await ipcRendererWrapper.invoke("process:ffmpeg:get:available"),
				convert: async (opts: FfmpegConvertOptions) => {
					return await ipcRendererWrapper.invoke("process:ffmpeg:convert", opts);
				},
				getEncoders: async () => {
					return await ipcRendererWrapper.invoke("process:ffmpeg:get:encoders");
				},
				probe: async (path: string) => {
					return await ipcRendererWrapper.invoke("process:ffmpeg:get:info", path);
				},
			},
		},
		file: {
			write: async (filePath: string, binaryContent: Uint8Array) => {
				return await ipcRendererWrapper.invoke("file:write", filePath, binaryContent);
			},
			async getRandomTempFilePath(filename: string) {
				return await ipcRendererWrapper.invoke("file:temp:get", filename);
			},
			async delete(filepath: string, config?: RmDirOptions) {
				return await ipcRendererWrapper.invoke("file:delete", filepath, config);
			},
			async exists(filepath: string) {
				return await ipcRendererWrapper.invoke("file:exists", filepath);
			},
			async mkdir(dirpath: string) {
				return await ipcRendererWrapper.invoke("file:directory:create", dirpath);
			},
			async rename(from: string, to: string) {
				return await ipcRendererWrapper.invoke("file:rename", from, to);
			},
			async lstat(filepath: string): Promise<Stats> {
				return await ipcRendererWrapper.invoke("file:lstat", filepath);
			},
			async readdir(folder: string, recursively?: boolean): Promise<string[]> {
				return await ipcRendererWrapper.invoke("file:directory:read", folder, recursively);
			},
		},
		system: {
			/**
			 * Récupère des informations sur le système
			 * @param key
			 */
			async getInformation<K extends GetInformationKey>(key: K) {
				return (await ipcRendererWrapper.invoke("system:info:get", key)) as GetInformationResult[K];
			},
			async getMeta() {
				return await ipcRendererWrapper.invoke("system:meta:get");
			},
		},
		update: {
			/**
			 * Vérifie s'il y a une mise à jour disponible
			 */
			check() {
				return ipcRendererWrapper.invoke("update:check");
			},
			/**
			 * Lance le téléchargement de la mise à jour
			 */
			download() {
				return ipcRendererWrapper.invoke("update:download:start");
			},
			/**
			 * Quitte l'application et installe la mise à jour
			 */
			quitAndInstall() {
				return ipcRendererWrapper.invoke("update:quit-and-install");
			},
		},
		window: {
			/**
			 * Récupère l'id de la window
			 */
			getId() {
				return ipcRendererWrapper.invoke("window:id:get");
			},
		},
	};
}

export type PreloadExposedIpc = ReturnType<typeof getIpcSender>;
