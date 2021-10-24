import { createSlice } from "@reduxjs/toolkit";
import { setConfigurationFile, setStdioOutput, setVpnConnected } from "./action";
import { vpnConfig } from "../../../../config/networks/vpn";


export interface VpnState {
	configFile: string
	stdio: string
	connected: {
		openvpn: boolean,
		nordvpn: boolean
	},
}

const defaultState: VpnState = {
	configFile: vpnConfig.configFile,
	stdio: "",
	connected: {
		openvpn: false,
		nordvpn: false
	}
};


const slice = createSlice({
	initialState: defaultState,
	name: "Vpn",
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(setConfigurationFile, (state, action) => {
			state.configFile = action.payload;
		});
		addCase(setStdioOutput, (state, action) => {
			state.stdio = action.payload;
		});
		addCase(setVpnConnected, (state, { payload }) => {
			state.connected[payload.type] = payload.state;
		});
	}
});


// setInterval(() => {
// 	Services.networks.nordvpn.isConnected().then(x => store.dispatch(setVpnConnected({state: x, type: "nordvpn"})))
// 	Services.networks.openvpn.isConnected().then(x => store.dispatch(setVpnConnected({state: x, type: "openvpn"})))
// }, 500)

export const { reducer } = slice;
