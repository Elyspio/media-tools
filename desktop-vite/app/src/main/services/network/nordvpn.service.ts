import { spawn } from "child_process";
import { VpnService } from "./vpn.service";
import { injectable } from "inversify";
import { container } from "../../di/di.container";
import { ProcessService } from "../common/process.service";

export const countries = ["Switzerland", "France", "Germany"] as const;
export type Country = (typeof countries)[number];

@injectable()
export class NordvpnService extends VpnService {
	public static errors = {
		vpnCLientNotInstalled: new Error("Nordvpn client could not be found in PATH"),
	};

	private services = {
		process: container.get(ProcessService),
	};

	public async isClientInstalled() {
		return this.services.process.isInstalled("nordvpn");
	}

	public async connect(region?: Country) {
		if (!(await this.isClientInstalled())) throw NordvpnService.errors.vpnCLientNotInstalled;
		const bonus = [];
		if (region) bonus.push("-g", region);
		await this.runIgnoringError("nordvpn", "-c", ...bonus);
	}

	public async disconnect() {
		if (!(await this.isClientInstalled())) throw NordvpnService.errors.vpnCLientNotInstalled;
		await this.runIgnoringError("nordvpn", "-d");
	}

	public async waitForConnect(region?: Country) {
		const { store } = await import("../../../renderer/store");
		return new Promise<void>(async (resolve) => {
			await this.connect(region);
			const timer = setInterval(() => {
				const { nordvpn } = store.getState().vpn.connected;
				if (nordvpn) {
					clearInterval(timer);
					resolve();
				}
			}, 500);
		});
	}

	public override isConnected() {
		return super.isInterfaceConnected("nordvpn");
	}

	private async runIgnoringError(command: string, ...params: string[]) {
		try {
			spawn(command, params, { detached: true, stdio: "ignore" });
		} catch (e) {}
	}
}
