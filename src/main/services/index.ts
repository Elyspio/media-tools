import { DialogService } from "./electron/dialogService";
import { MediaService } from "./media/mediaService";
import { TorrentService } from "./media/torrentService";
import { SystemService } from "./system/system";
import { FilesService } from "./files/filesService";
import { ConfigurationService } from "./configuration/configurationService";
import { GithubService } from "./projects/githubService";
import { AjaxService } from "./ajax/ajaxService";
import { FeatureService } from "./projects/feature";
import { DockerService } from "./projects/dockerService";
import { WindowService } from "./electron/windowService";
import { OpenVpnService } from "./network/openVpnService";
import { NordVpnService } from "./network/nordvpnService";
import { NetworkService } from "./network/networkService";

export const Services = {
	electron: {
		dialog: new DialogService(),
		window: new WindowService()
	},
	media: { convert: new MediaService(), torrent: new TorrentService() },
	system: new SystemService(),
	files: new FilesService(),
	configuration: new ConfigurationService(),
	projects: {
		github: new GithubService(),
		feature: new FeatureService(),
		docker: new DockerService()
	},
	ajax: new AjaxService(),
	networks: {
		openvpn: new OpenVpnService(),
		nordvpn: new NordVpnService(),
		network: new NetworkService()
	}
};
