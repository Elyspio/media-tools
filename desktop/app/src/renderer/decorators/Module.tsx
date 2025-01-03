import { addComponent, ModuleDescription } from "@modules/router/router.reducer";
import * as React from "react";
import { Logger } from "@/main/utils/logger";
import { addRoute } from "@modules/router/router.action";

type Info = Omit<ModuleDescription, "component">;

export const defaultModuleDescription = {
	autoResize: {
		height: false,
		width: false,
	},
	show: {
		name: true,
		appboard: true,
	},
};

type Must = Omit<Info, keyof typeof defaultModuleDescription> & Partial<typeof defaultModuleDescription>;

const logger = Logger("Module");

export function Register(info: Must, ...connector: ((...any: any[]) => any)[]) {
	window.store.dispatch(addRoute({ ...defaultModuleDescription, ...info, component: info.name }));
	return function (target: any) {
		logger.info("Registering component", { name: info.name, component: target.name });

		let ret = target;
		connector.reverse().forEach((f) => {
			ret = f(ret);
		});

		addComponent(info.path, ret);
		return target;
	};
}

export function register<T>(WrappedComponent: React.ComponentType<T>, info: Must, ...connector: ((...any: any[]) => any)[]) {
	window.store.dispatch(addRoute({ ...defaultModuleDescription, ...info, component: info.name }));
	logger.info("Registering component", {
		name: info.name,
		component: WrappedComponent.displayName ?? WrappedComponent.name,
	});

	let comp = (props: any) => <WrappedComponent {...props} />;

	connector.reverse().forEach((f) => {
		comp = f(comp);
	});

	addComponent(info.path, comp as any);

	return comp;
}
