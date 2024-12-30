import { Configuration, ConfigurationService } from "@services/configuration/configuration.service";
import { createAsyncActionGenerator, getServices } from "../../utils/utils.actions";
import { WindowService } from "@services/electron/window.service";
import { defaultConfiguration } from "@/config/configuration";

const createAsyncThunk = createAsyncActionGenerator("configuration");

export const setConfig = createAsyncThunk("set-config", async (config: Configuration, { extra }) => {
	const services = getServices({ config: ConfigurationService }, extra);

	await services.config.set(config);
});

export const regenerateConfig = createAsyncThunk("regenerate-config", async (config: Configuration, { extra }) => {
	const services = getServices({ config: ConfigurationService }, extra);

	await services.config.regenerate();
});

export const initConfig = createAsyncThunk("init-config", async (_, { extra, dispatch }) => {
	const services = getServices({ config: ConfigurationService }, extra);

	dispatch(setConfig(await services.config.get()));
});

export const resetDimensions = createAsyncThunk("reset-dimensions", async (_, { extra, dispatch }) => {
	const services = getServices({ window: WindowService }, extra);

	services.window.resetDimensions();

	dispatch(setConfig(defaultConfiguration));
});

export const watchWindowResize = createAsyncThunk("watch-window-resize", async (_, { extra, getState, dispatch }) => {
	setInterval(() => {
		const {
			config: { current: config },
			routing: { routes, path },
		} = getState();

		const services = getServices({ window: WindowService, config: ConfigurationService }, extra);

		const current = routes[path];
		if (current?.autoResize.width || current?.autoResize.height) {
			const keys = Object.keys(config.frame.resize) as Array<keyof Configuration["frame"]["resize"]>;
			const dim = keys.filter((k) => config.frame.resize[k] && current.autoResize[k]);
			const delta = services.window.isUnderSized(dim);
			if (dim.map((d) => delta[d]).some((v) => v > 0)) {
				services.window.resize(delta);
			}
		}
	}, 250);
});
