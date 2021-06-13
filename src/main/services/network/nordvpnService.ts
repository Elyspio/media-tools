import {isInstalled} from "../../util";
import {spawn} from "child_process";
import {VpnService} from "./vpnService";
import {store} from "../../../renderer/store";


export const countries = ["Switzerland", "France", "Germany"] as const
export type Country = typeof countries[number]

export class NordVpnService extends VpnService {

	public static errors = {
		vpnCLientNotInstalled: new Error("Nordvpn client could not be found in PATH")
	};


	public async isClientInstalled() {
		return isInstalled("nordvpn");
	}

	public async connect(region?: Country) {
		if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
		const bonus = []
		if (region) bonus.push("-g", region);
		await this.runIgnoringError("nordvpn", "-c", ...bonus)
	}

	public async disconnect() {
		if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
		await this.runIgnoringError("nordvpn", "-d")

	}


	public waitForConnect(region?: Country) {
		return new Promise<void>(async resolve => {
			await this.connect(region);
			const timer = setInterval(() => {
				const {nordvpn} = store.getState().vpn.connected;
				if (nordvpn) {
					clearInterval(timer)
					resolve();
				}
			}, 500)
		})
	}


	public override isConnected() {
		return super.isInterfaceConnected("nordvpn")
	}

	private async runIgnoringError(command: string, ...params: string[]) {
		try {
			spawn(command, params, {detached: true, stdio: "ignore"})
		} catch (e) {

		}
	}
}
