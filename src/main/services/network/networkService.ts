import { platform } from "os";
import { exec } from "../../util";

const plat = platform();

export class NetworkService {

	static errors = {
		platformNotSupported: new Error("The platform " + plat + " is not supported for this feature")
	};

	public async isInterfaceConnected(name: string) {

		let command = "";

		if (plat === "win32") command = "netsh interface show interface";

		if (command === "") throw NetworkService.errors.platformNotSupported;

		const { stdout, stderr } = await exec(command);

		if (plat === "win32") {
			let lines = stdout.split("\n");
			return (lines.some(l => l.includes(name) && l.includes("Connected")));
		}

		return false;
	}
}
