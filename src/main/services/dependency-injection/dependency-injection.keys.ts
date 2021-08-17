export const DependencyInjectionKeys = {
	electron: {
		dialog: Symbol.for("DialogService"),
		window: Symbol.for("WindowService")
	},
	media: {
		convert: Symbol.for("MediaService"),
		torrent: Symbol.for("TorrentService")
	},
	system: Symbol.for("SystemService"),
	files: Symbol.for("FilesService"),
	configuration: Symbol.for("ConfigurationService"),
	projects: {
		github: Symbol.for("GithubService"),
		feature: Symbol.for("FeatureService"),
		docker: Symbol.for("DockerService")
	},
	networks: {
		openvpn: Symbol.for("OpenvpnService"),
		nordvpn: Symbol.for("NordvpnService"),
	}
}
