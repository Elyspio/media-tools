import { createActionGenerator } from "../../common/common.actions";
import { Frame } from "../../../core/apis/rest/backend/generated";

const createAction = createActionGenerator("screen-share");


export const setScreenShareFrame = createAction<Frame>("set-frame");
