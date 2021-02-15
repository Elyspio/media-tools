import { createReducer } from "@reduxjs/toolkit";
import { setConfigurationFile, setStdioOutput } from "./action";
import { vpnConfig } from "../../../../config/networks/vpn.private";


export interface VpnState {
	configFile: string
	stdio: string
}

const defaultState: VpnState = {
	configFile: vpnConfig.configFile,
	stdio: ""
};


export const reducer = createReducer<VpnState>(defaultState, ({ addCase }) => {
	addCase(setConfigurationFile, (state, action) => {
		state.configFile = action.payload;
	});
	addCase(setStdioOutput, (state, action) => {
		state.stdio = action.payload;
	});
});
