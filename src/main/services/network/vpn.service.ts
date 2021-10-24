import { networkInterfaces } from "systeminformation";
import { injectable } from "inversify";

@injectable()
export abstract class VpnService {
	abstract isConnected(interfaceName: string): Promise<boolean>;

	protected async isInterfaceConnected(name: string) {
		const interfaces = await networkInterfaces();
		return interfaces.some(inter => inter.ifaceName.toLocaleLowerCase().includes(name.toLocaleLowerCase()) && inter.operstate === "up");
	}
}
