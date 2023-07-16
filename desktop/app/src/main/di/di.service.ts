import { Container } from "inversify";
import { ProcessService } from "../services/common/process.service";
import { WindowService } from "../services/electron/window.service";
import { DialogService } from "../services/electron/dialog.service";
import { MediaService } from "../services/media/media.service";
import { TorrentService } from "../services/media/torrent.service";
import { SystemService } from "../services/system/system.service";
import { FilesService } from "../services/files/files.service";
import { ConfigurationService } from "../services/configuration/configuration.service";
import { GithubService } from "../services/projects/github.service";
import { FeatureService } from "../services/projects/feature.service";
import { DockerService } from "../services/projects/docker.service";
import { OpenvpnService } from "../services/network/openvpn.service";
import { NordvpnService } from "../services/network/nordvpn.service";

export function initDiServices(container: Container) {
	container.bind(ProcessService).toSelf();
	container.bind(DialogService).toSelf();
	container.bind(WindowService).toSelf();
	container.bind(MediaService).toSelf();
	container.bind(TorrentService).toSelf();
	container.bind(SystemService).toSelf();
	container.bind(FilesService).toSelf();
	container.bind(ConfigurationService).toSelf();
	container.bind(GithubService).toSelf();
	container.bind(FeatureService).toSelf();
	container.bind(DockerService).toSelf();
	container.bind(OpenvpnService).toSelf();
	container.bind(NordvpnService).toSelf();
}
