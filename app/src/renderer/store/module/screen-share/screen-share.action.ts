import { createAction as _createAction } from "@reduxjs/toolkit";
import { ScreenShareState } from "./screen-share";

const createAction = <T>(type: string) => _createAction<T>(`screen-share/${type}`);

export const setStreamId = createAction<ScreenShareState["streamId"]>("setScreenId");
