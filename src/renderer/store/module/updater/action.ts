import { createAction as _createAction } from "@reduxjs/toolkit";


const createAction = <T>(type: string) => _createAction<T>(`update/${type}`);

export const setDownloadPercentage = createAction<number>("setDownloadPercentage");
export const setServerLatestVersion = createAction<string>("setServerLatestVersion");
