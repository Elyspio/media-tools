import { isInstalled } from "../../util";
import { vpnConfig } from "../../../config/networks/vpn";
import { spawn } from "child_process";
import { EventManager } from "../../util/events";
import { injectable } from "inversify";

type StatusListener = "connected" | "disconnected";
type StdioListener = string;

@injectable()
export class OpenvpnService extends EventManager<["data", "status"], [StdioListener, StatusListener]> {
	public static errors = {
		vpnCLientNotInstalled: new Error("Vpn client could not be found in PATH"),
		alreadyConnected: new Error("Vpn is already connected"),
		notConnected: new Error("Vpn is not connected"),
	};
	private static spawned: ReturnType<typeof spawn>;
	public stdout: string[] = [];

	public static async isClientInstalled() {
		return isInstalled("openvpn");
	}

	async isConnected(): Promise<boolean> {
		return false;
	}

	public connect() {
		if (!OpenvpnService.isClientInstalled()) {
			throw OpenvpnService.errors.vpnCLientNotInstalled;
		}

		if (!OpenvpnService.spawned) {
			OpenvpnService.spawned = spawn("openvpn --config " + vpnConfig.configFile, { stdio: "pipe" });
			OpenvpnService.spawned.stdout?.on("data", args => {
				this.stdout.push(args.toString());
				this.emit("data", this.stdout.join());
				this.emit("status", "disconnected");
			});
		} else {
			throw OpenvpnService.errors.alreadyConnected;
		}
	}

	public disconnect() {
		if (!OpenvpnService.spawned) {
			throw OpenvpnService.errors.notConnected;
		}
		OpenvpnService.spawned.kill("SIGTERM");
		this.emit("status", "disconnected");
	}
}
