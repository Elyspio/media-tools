import { createReducer } from "@reduxjs/toolkit";
import { addRoute, setPath } from "./router.action";
import { ReactElement } from "react";

const requires = [
	"external/home-assistant/HomeAssistant",
	"internal/encoder/Encoder",
	"internal/encoder/recap/Recap",
	"internal/purge/Purge",
	"internal/projects/Projects",
	"internal/vpn/Vpn",
	"internal/renamer/Renamer",
	"internal/test/Test",
	"internal/updater/Updater",
	"internal/torrent/Torrent",
	"internal/config/Config",
	"internal/screen-share/ScreenShare",
	"app-board/AppBoard",
];

for (const c of requires) {
	import(`../../../components/modules/${c}.tsx`);
}

type ReactComponent = () => ReactElement;

export type ModuleDescription = {
	name: string;
	description?: string;
	icon?: string;
	external?: boolean;
	component: ReactComponent;
	path: string;
	show: {
		// if this module will be shown in AppBoard
		appboard: boolean;
		// if it will be showed at top of the page
		name: boolean;
	};
	autoResize: {
		width: boolean;
		height: boolean;
	};
};

export type ModuleDescriptionStore = Omit<ModuleDescription, "component"> & { component: string };

export interface RouterState {
	path: string;
	routes: { [key: string]: ModuleDescriptionStore };
}

const defaultState: RouterState = {
	path: "/",
	routes: {},
};

const components: { [key: string]: ReactComponent } = {};

export function addComponent(route: ModuleDescription["path"], component: ReactComponent) {
	components[route] = component;
}

export function getComponent(route: ModuleDescription["path"]): ReactComponent {
	return components[route];
}

export const reducer = createReducer<RouterState>(defaultState, builder => {
	builder.addCase(setPath, (state, action) => {
		state.path = action.payload;
	});

	builder.addCase(addRoute, (state, action) => {
		state.routes[action.payload.path] = action.payload;
	});
});
