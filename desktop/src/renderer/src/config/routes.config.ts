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

export type RoutePath = "/" | "/internal/encoder" | "/internal/torrent" | "/internal/purge" | "/external/home-assistant";

const routesInfoBase: Record<RoutePath, RouteDescription> = {
	"/": {
		name: "Dashboard",
		show: {
			appboard: false,
			name: false,
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
	"/internal/torrent": {
		name: "Torrent",
		description: "Search nyaa.si and send torrents to qBittorrent",
		show: {
			appboard: true,
			name: true,
		},
	},
	"/internal/purge": {
		name: "Purge",
		description: "Purge node_modules and build caches",
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
