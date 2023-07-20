import { ScreenShareState } from "./screen-share";
import { createActionGenerator } from "../../utils/utils.actions";

const createAction = createActionGenerator("screen-share");

export const setStreamId = createAction<ScreenShareState["streamId"]>("setScreenId");
