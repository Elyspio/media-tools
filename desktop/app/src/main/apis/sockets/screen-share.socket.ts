import * as signalR from "@microsoft/signalr";
import { HubConnection, LogLevel, Subject } from "@microsoft/signalr";
import { inject, injectable } from "inversify";
import { Frame } from "../rest/backend/generated";
import { ConfigurationService } from "@services/configuration/configuration.service";

interface ScreenShareHub extends HubConnection {
	on(event: "FrameUpdate", callback: (frame: Frame) => void): void;
}

@injectable()
export class ScreenShareSocket {
	#connection: ScreenShareHub | undefined;
	#subject: Subject<Frame> | undefined;

	@inject(ConfigurationService)
	private configurationService!: ConfigurationService;

	public get on() {
		if (!this.initialized) throw new Error("ScreenShareSocket not initialized");
		return this.#connection!.on;
	}

	private get initialized() {
		return this.#subject && this.#connection;
	}

	async init() {
		if (this.#connection) await this.#connection.stop();

		const config = await this.configurationService.get();

		this.#connection = new signalR.HubConnectionBuilder()
			.withUrl(config.endpoints.hubs.screenshare)
			.configureLogging(LogLevel.Information)
			.withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => 5000 })
			.build();

		await this.#connection.start();

		this.#subject = new signalR.Subject();

		this.#connection.send("UploadFrame", this.#subject);
	}

	public async sendFrame(frame: Frame) {
		if (!this.initialized) throw new Error("ScreenShareSocket not initialized");

		this.#subject?.next(frame);
	}

	public async close() {
		await this.#subject?.complete();
		await this.#connection?.stop();

		this.#connection = this.#subject = undefined;
	}
}
