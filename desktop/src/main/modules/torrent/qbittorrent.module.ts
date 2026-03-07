import { inject, injectable } from "inversify";
import { ConfigModule } from "@main/modules/config/config.module";
import { OidcModule } from "@main/modules/auth/oidc.module";

@injectable()
export class QBittorrentModule {
	public constructor(
		@inject(ConfigModule) private readonly configModule: ConfigModule,
		@inject(OidcModule) private readonly oidcModule: OidcModule
	) {}

	public async addTorrentFromUrl(torrentUrl: string): Promise<void> {
		const torrentResponse = await fetch(torrentUrl);
		if (!torrentResponse.ok) {
			throw new Error(`Failed to download torrent file (${torrentResponse.status})`);
		}

		const torrentBuffer = new Uint8Array(await torrentResponse.arrayBuffer());
		const token = await this.oidcModule.getAccessToken();
		const config = await this.configModule.getConfig();
		const apiBaseUrl = config.endpoints.qbittorrent.apiBaseUrl.trim();
		if (!apiBaseUrl) {
			throw new Error("qBittorrent API base URL is not configured");
		}

		const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/api/v2/torrents/add`;
		const formData = new FormData();
		formData.append("torrents", new Blob([torrentBuffer]), "download.torrent");
		formData.append("firstLastPiecePrio", "true");

		const addResponse = await fetch(endpoint, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!addResponse.ok) {
			const body = await addResponse.text();
			throw new Error(`Failed to add torrent (${addResponse.status}): ${body.slice(0, 250)}`);
		}
	}
}
