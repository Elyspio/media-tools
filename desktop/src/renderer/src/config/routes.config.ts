import { ReactNode } from "react";

export type RouteDescription = {
	name: string;
	description?: string;
	icon?: ReactNode;
	show: {
		// if this module will be shown in AppBoard
		appboard: boolean;
		// if it will be showed at top of the page
		name: boolean;
	};
};

export type RoutePath = "/" | "/internal/config" | "/internal/encoder" | "/internal/renamer" | "/internal/torrent" | "/external/home-assistant";

const routesInfoBase: Record<RoutePath, RouteDescription> = {
	"/": {
		name: "Dashboard",
		show: {
			appboard: false,
			name: false,
		},
	},
	"/internal/config": {
		name: "Config",
		description: "Configure the application settings",
		show: {
			appboard: true,
			name: true,
		},
	},
	"/internal/encoder": {
		name: "Encoder",
		description: "Video encoder tools and settings",
		show: {
			appboard: true,
			name: true,
		},
	},
	"/internal/renamer": {
		name: "Renamer",
		description: "Batch rename your files easily",
		show: {
			appboard: true,
			name: true,
		},
	},
	"/internal/torrent": {
		name: "Torrent",
		description: "Search nyaa.si and send torrents to qBittorrent",
		show: {
			appboard: true,
			name: true,
		},
	},
	"/external/home-assistant": {
		name: "Home Assistant",
		description: "Access your Home Assistant instance",
		show: {
			appboard: true,
			name: true,
		},
	},
};

export const routes = Object.entries(routesInfoBase).reduce(
	(acc, [key, route]) => {
		acc[key] = { ...route, path: key };
		return acc;
	},
	{} as Record<RoutePath, RouteDescription & { path: RoutePath }>
);
