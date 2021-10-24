import { createAction as _createAction } from "@reduxjs/toolkit";
import { VpnState } from "./reducer";

const createAction = <T>(type: string) => _createAction<T>(`vpn/${type}`);

export const setConfigurationFile = createAction<VpnState["configFile"]>("setConfigurationFile");
export const setStdioOutput = createAction<VpnState["stdio"]>("setStdioOutput");

export const setVpnConnected = createAction<{ state: boolean; type: keyof VpnState["connected"] }>("setVpnConnected");
