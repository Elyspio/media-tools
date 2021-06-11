import {exec, isInstalled} from "../../util";


export const countries = ["Switzerland", "France", "Germany"] as const
export type Country = typeof countries[number]

export class NordVpnService {

    public static errors = {
        vpnCLientNotInstalled: new Error("Nordvpn client could not be found in PATH")
    };

    public static interface: string = "NordLynx";


    public async isClientInstalled() {
        return isInstalled("nordvpn");
    }

    public async connect(region?: Country) {
        if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
        let command = "nordvpn -c";
        if (region) command += ` -g "${region}" && exit 0`;
        await this.runIgnoringError(command)
    }

    public async disconnect() {
        if (!await this.isClientInstalled()) throw NordVpnService.errors.vpnCLientNotInstalled;
        const command = "nordvpn -d";
        await this.runIgnoringError(command)

    }

    private async runIgnoringError(command: string) {
        try {
            await exec(command);
        } catch (e) {

        }
    }
}
