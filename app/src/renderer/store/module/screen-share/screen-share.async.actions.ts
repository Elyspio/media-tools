import { createAsyncActionGenerator, getService } from "../../utils/utils.actions";
import { Frame } from "../../../../main/apis/rest/backend/generated";
import { ScreenShareSocket } from "../../../../main/apis/sockets/screen-share.socket";

const createAsyncThunk = createAsyncActionGenerator("screen-share");

export const sendFrame = createAsyncThunk("send-frame", async (frame: Frame, { extra }) => {
	const screenShareSocket = getService(ScreenShareSocket, extra);

	await screenShareSocket.sendFrame(frame);
});

export const stopScreenShare = createAsyncThunk("stop-screen-share", async (_, { extra }) => {
	const screenShareSocket = getService(ScreenShareSocket, extra);

	await screenShareSocket.close();
});
export const startScreenShare = createAsyncThunk("start-screen-share", async (_, { extra }) => {
	const screenShareSocket = getService(ScreenShareSocket, extra);

	await screenShareSocket.init();
});
