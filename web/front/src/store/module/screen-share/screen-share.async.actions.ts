import { createAsyncActionGenerator, getService } from "../../common/common.actions";
import { ScreenShareSocket } from "../../../core/apis/sockets/screen-share.socket";
import { setScreenShareFrame } from "./screen-share.actions";

const createAsyncThunk = createAsyncActionGenerator("screen-share");


export const startScreenShare = createAsyncThunk("init", async (_, { extra, dispatch }) => {
	const screenShareSocket = getService(ScreenShareSocket, extra);
	await screenShareSocket.init();
	screenShareSocket.connection.on("FrameUpdate", frame => {
		dispatch(setScreenShareFrame(frame));
	});
	await screenShareSocket.start();
});
export const stopScreenShare = createAsyncThunk("stop", async (_, { extra }) => {
	const screenShareSocket = getService(ScreenShareSocket, extra);
	await screenShareSocket.close();
});