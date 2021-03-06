import { createAction as _createAction } from "@reduxjs/toolkit";
import { Configuration } from "../../../../main/services/configuration/configurationService";


const createAction = <T>(type: string) => _createAction<T>(`configuration/${type}`);

export const setConfig = createAction<Configuration>("setConfig");
