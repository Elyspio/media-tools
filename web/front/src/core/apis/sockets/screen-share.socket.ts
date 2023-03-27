import * as signalR from "@microsoft/signalr";
import { HubConnection, LogLevel } from "@microsoft/signalr";
import { injectable } from "inversify";
import { Frame } from "../rest/backend/generated";

interface ScreenShareHub extends HubConnection {
	on(event: "FrameUpdate", callback: (frame: Frame) => void): void;
}

@injectable()
export class ScreenShareSocket {
	#connection: ScreenShareHub | undefined;

	private get initialized() {
		return this.#connection;
	}

	async init() {
		if (this.#connection) await this.#connection.stop();

		this.#connection = new signalR.HubConnectionBuilder()
			.withUrl(window.config.sockets.screenShare)
			.configureLogging(LogLevel.Information)
			.withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 5000 })
			.build();
	}

	public async start() {
		if (!this.initialized) throw new Error("ScreenShareSocket not initialized");
		await this.#connection!.start();
	}

	public async close() {
		await this.#connection?.stop();
		this.#connection = undefined;
	}

	public get connection() {
		if (!this.initialized) throw new Error("ScreenShareSocket not initialized");
		return this.#connection!;
	}
}
