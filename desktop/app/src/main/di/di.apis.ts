import { Container } from "inversify";
import { ScreenShareSocket } from "@apis/sockets/screen-share.socket";
import { WeatherApi } from "@apis/rest/backend/clients";

export function initDiApis(container: Container) {
	container.bind(ScreenShareSocket).toSelf();
	container.bind(WeatherApi).toSelf();
}
