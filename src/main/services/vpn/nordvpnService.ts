import { isInstalled, spawnAsync } from "../../util";


export class NordVpnService {

	public static errors = {
		vpnCLientNotInstalled: new Error("Nordvpn client could not be found in PATH")
	};
	public stdout: string[] = [];

	public async isClientInstalled() {
		return isInstalled("nordvpn");
	}

	public async connect(mode?: "P2P") {
		if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
		let command = "nordvpn -c";
		if (mode === "P2P") command += " -g P2P";
		await spawnAsync(command);
	}

	public async disconnect() {
		if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
		await spawnAsync("nordvpn -d");
	}
}
