import { isInstalled } from "../../util";
import { vpnConfig } from "../../../config/vpn.private";
import { spawn } from "child_process";


type StatusListener = (status: "connected" | "disconnected") => any;

type StdioListener = (data: string) => any;

export interface VpnService {
	on(event: "data", callback: StdioListener): void
	on(event: "status", callback: StatusListener): void
}

export class VpnService implements VpnService {

	public static errors = {
		vpnCLientNotInstalled: new Error("Vpn client could not be found in PATH"),
		alreadyConnected: new Error("Vpn is already connected")
	};
	public static readonly stdout: string[] = [];
	private static _instance: ReturnType<typeof spawn>;
	private listeners = {
		stdio: Array<StdioListener>(),
		status: Array<StatusListener>()
	}

	public static async isClientInstalled() {
		return isInstalled("openvpn");
	}

	public on(event: "data" | "status", callback: StdioListener | StatusListener) {
		if(event === "data") this.listeners.stdio.push(callback as StdioListener)
		if(event === "status") this.listeners.status.push(callback as StatusListener);
	}
x

	public connect() {

		if (!VpnService.isClientInstalled()) {
			throw VpnService.errors.vpnCLientNotInstalled;
		}

		if (!VpnService._instance) {
			VpnService._instance = spawn("openvpn --config " + vpnConfig.configFile, { stdio: "pipe" });
			VpnService._instance.stdout?.on("data", args => {
				VpnService.stdout.push(args.toString());
				this.listeners.forEach(l => l(args.toString()));
			});
		} else {
			throw VpnService.errors.alreadyConnected;
		}
	}

	public disconnect() {
		VpnService._instance.kill("SIGTERM");
	}

}
