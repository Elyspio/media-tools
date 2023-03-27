import { networkInterfaces, Systeminformation } from "systeminformation";
import { injectable } from "inversify";
import NetworkInterfacesData = Systeminformation.NetworkInterfacesData;

@injectable()
export abstract class VpnService {
	abstract isConnected(interfaceName: string): Promise<boolean>;

	protected async isInterfaceConnected(name: string) {
		const interfaces = (await networkInterfaces()) as NetworkInterfacesData[];
		return interfaces.some(inter => inter.ifaceName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && inter.operstate === "up");
	}
}
