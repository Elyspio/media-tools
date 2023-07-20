import React, { useCallback } from "react";
import Frame from "./frame/Frame";
import { Router } from "./router/Router";
import { Configuration, ConfigurationService } from "../../main/services/configuration/configuration.service";
import { store } from "../store";
import { useInjection } from "inversify-react";
import { WindowService } from "../../main/services/electron/window.service";

export function Application() {
	const services = {
		configuration: useInjection(ConfigurationService),
		window: useInjection(WindowService),
	};
	const checkHeight = useCallback(async () => {
		const {
			routing: { routes, path },
		} = store.getState();
		const current = routes[path];
		if (current?.autoResize.width || current?.autoResize.height) {
			const config = await services.configuration.get();
			const keys = Object.keys(config.frame.resize) as Array<keyof Configuration["frame"]["resize"]>;
			const dim = keys.filter((k) => config.frame.resize[k] && current.autoResize[k]);
			const delta = await services.window.isUnderSized(dim);
			if (dim.map((d) => delta[d]).some((v) => v > 0)) {
				await services.window.resize(delta);
			}
		}
	}, [services.configuration, services.window]);

	React.useEffect(() => {
		// setTimeout(checkUpdate, 1000);
		setInterval(checkHeight, 250);
	}, [checkHeight]);

	return (
		<Frame>
			<Router />
		</Frame>
	);
}

export default Application;