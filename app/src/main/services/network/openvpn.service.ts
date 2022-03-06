import { vpnConfig } from "../../../config/networks/vpn";
import { spawn } from "child_process";
import { EventManager } from "../../utils/events";
import { injectable } from "inversify";
import { container } from "../dependency-injection/dependency-injection.container";
import { ProcessService } from "../common/process.service";

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

	private services = {
		process: container.get(ProcessService),
	};

	public async isClientInstalled() {
		return this.services.process.isInstalled("openvpn");
	}

	async isConnected(): Promise<boolean> {
		return false;
	}

	public connect() {
		if (!this.isClientInstalled()) {
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

	public async disconnect() {
		if (!OpenvpnService.spawned) {
			throw OpenvpnService.errors.notConnected;
		}
		await this.services.process.kill(OpenvpnService.spawned);
		this.emit("status", "disconnected");
	}
}
