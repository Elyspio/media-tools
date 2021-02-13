import { isInstalled } from "../../util";
import { vpnConfig } from "../../../config/vpn.private";
import { spawn } from "child_process";
import { EventManager } from "../../util/events";

type StatusListener = "connected" | "disconnected"
type StdioListener = string

export class OpenVpnService extends EventManager<["data", "status"], [StdioListener, StatusListener]> {

	public static errors = {
		vpnCLientNotInstalled: new Error("Vpn client could not be found in PATH"),
		alreadyConnected: new Error("Vpn is already connected"),
		notConnected: new Error("Vpn is not connected")
	};
	private static spawned: ReturnType<typeof spawn>;
	public stdout: string[] = [];

	public static async isClientInstalled() {
		return isInstalled("openvpn");
	}

	public connect() {

		if (!OpenVpnService.isClientInstalled()) {
			throw OpenVpnService.errors.vpnCLientNotInstalled;
		}

		if (!OpenVpnService.spawned) {
			OpenVpnService.spawned = spawn("openvpn --config " + vpnConfig.configFile, { stdio: "pipe" });
			OpenVpnService.spawned.stdout?.on("data", args => {
				this.stdout.push(args.toString());
				this.emit("data", this.stdout.join());
				this.emit("status", "disconnected");
			});
		} else {
			throw OpenVpnService.errors.alreadyConnected;
		}
	}

	public disconnect() {
		if (!OpenVpnService.spawned) {
			throw OpenVpnService.errors.notConnected;
		}
		OpenVpnService.spawned.kill("SIGTERM");
		this.emit("status", "disconnected");
	}

}
