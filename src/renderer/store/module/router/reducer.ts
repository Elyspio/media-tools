import {createReducer} from "@reduxjs/toolkit";
import {addRoute, setPath} from "./action";
import {FilesService} from "../../../../main/services/files/files.service";

const requires = [
	"external/lights/Light",
	"external/home-assistant/HomeAssistant",
	"internal/encoder/Encoder",
	"internal/encoder/Recap",
	"internal/purge/Purge",
	"internal/projects/Projects",
	"internal/vpn/Vpn",
	"internal/renamer/Renamer",
	"internal/updater/Updater",
	"internal/torrent/Torrent",
	"internal/config/Config",
	"app-board/AppBoard"
];

requires.forEach(async (c) => {
	import(`../../../components/modules/${c}.tsx`);
})


type ReactComponent = any;

export type ModuleDescription = {
	name: string,
	description?: string,
	icon?: string,
	external?: boolean
	component: ReactComponent,
	path: string,
	show: {
		// if this module will be shown in AppBoard
		appboard: boolean,
		// if it will be showed at top of the page
		name: boolean
	},
	autoResize: {
		width: boolean,
		height: boolean
	}
}


export interface RouterState {
	path: string,
	routes: { [key: string]: Omit<ModuleDescription, "component"> & { component: string } }
}

const defaultState: RouterState = {
	path: "/",
	routes: {}
};

const components: { [key: string]: ReactComponent } = {};

export function addComponent(route: string, component: ReactComponent) {
	components[route] = component;
}

export function getComponent(route: string) {
	return components[route];
}


export const reducer = createReducer<RouterState>(defaultState, builder => {

	builder.addCase(setPath, ((state, action) => {
		state.path = action.payload;
	}));

	builder.addCase(addRoute, ((state, action) => {
		state.routes[action.payload.path] = action.payload;
	}));


});
