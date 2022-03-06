import { addRoute } from "../store/module/router/router.action";
import { store } from "../store";
import { addComponent, ModuleDescription } from "../store/module/router/router.reducer";
import * as React from "react";
import { Logger } from "../../main/utils/logger";

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

export function Register(info: Must, ...connector: Function[]) {
	store.dispatch(addRoute({ ...defaultModuleDescription, ...info, component: info.name }));
	return function (target: any) {
		logger.info("Registering component", { name: info.name, component: target.name });

		let ret = target;
		connector.reverse().forEach(f => {
			ret = f(ret);
		});

		addComponent(info.path, ret);
		return target;
	};
}

export function register(WrappedComponent: React.ComponentType, info: Must, ...connector: Function[]) {
	store.dispatch(addRoute({ ...defaultModuleDescription, ...info, component: info.name }));
	logger.info("Registering component", { name: info.name, component: WrappedComponent.name });

	let comp = class extends React.Component {
		override render() {
			// Enrobe le composant initial dans un conteneur, sans le modifier. Mieux !
			return <WrappedComponent {...this.props} />;
		}
	};

	connector.reverse().forEach(f => {
		comp = f(comp);
	});

	addComponent(info.path, comp);

	return comp;
}
