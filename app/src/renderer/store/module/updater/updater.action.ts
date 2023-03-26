import { createAction as _createAction } from "@reduxjs/toolkit";
import { AppVersion } from "../../../../main/apis/rest/updater";

const createAction = <T>(type: string) => _createAction<T>(`update/${type}`);

export const setDownloadPercentage = createAction<number>("setDownloadPercentage");
export const setServerLatestVersion = createAction<AppVersion>("setServerLatestVersion");
export const setServerUrl = createAction<string>("setServerUrl");
