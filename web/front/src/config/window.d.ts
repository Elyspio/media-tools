export type Config = {
	endpoints: {
		core: string;
		authentication: string;
	};
	sockets: {
		screenShare: string
	},
	loginPageUrl: string;
};

declare global {
	interface Window {
		config: Config;
	}
}
