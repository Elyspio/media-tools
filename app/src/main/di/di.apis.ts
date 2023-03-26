import { Container } from "inversify";
import { ScreenShareSocket } from "../apis/sockets/screen-share.socket";

export function initDiApis(container: Container) {
	container.bind(ScreenShareSocket).toSelf();
}
