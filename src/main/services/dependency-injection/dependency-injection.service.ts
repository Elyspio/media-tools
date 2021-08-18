console.info("Dependency injection started")
import {DialogService} from "../electron/dialog.service";
import {MediaService} from "../media/media.service";
import {SystemService} from "../system/system.service";
import {FilesService} from "../files/files.service";
import {ConfigurationService} from "../configuration/configuration.service";
import {GithubService} from "../projects/github.service";
import {FeatureService} from "../projects/feature.service";
import {DockerService} from "../projects/docker.service";
import {WindowService} from "../electron/window.service";
import {OpenvpnService} from "../network/openvpn.service";
import {NordvpnService} from "../network/nordvpn.service";
import {TorrentService} from "../media/torrent.service";
import {DependencyInjectionKeys} from "./dependency-injection.keys";
import {container} from "./dependency-injection.container";

container.bind<DialogService>(DependencyInjectionKeys.electron.dialog).to(DialogService);
container.bind<WindowService>(DependencyInjectionKeys.electron.window).to(WindowService);
container.bind<MediaService>(DependencyInjectionKeys.media.convert).to(MediaService);
container.bind<TorrentService>(DependencyInjectionKeys.media.torrent).to(TorrentService);
container.bind<SystemService>(DependencyInjectionKeys.system).to(SystemService);
container.bind<FilesService>(DependencyInjectionKeys.files).to(FilesService);
container.bind<ConfigurationService>(DependencyInjectionKeys.configuration).to(ConfigurationService);
container.bind<GithubService>(DependencyInjectionKeys.projects.github).to(GithubService)
container.bind<FeatureService>(DependencyInjectionKeys.projects.feature).to(FeatureService)
container.bind<DockerService>(DependencyInjectionKeys.projects.docker).to(DockerService);
container.bind<OpenvpnService>(DependencyInjectionKeys.networks.openvpn).to(OpenvpnService);
container.bind<NordvpnService>(DependencyInjectionKeys.networks.nordvpn).to(NordvpnService);

console.info("Dependency injection loaded")
