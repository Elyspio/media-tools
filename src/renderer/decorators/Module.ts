import { addRoute } from "../store/module/router/action";
import { store } from "../store";
import { addComponent, ModuleDescription } from "../store/module/router/reducer";


type Info = Omit<ModuleDescription, "component">;


export const defaultModuleDescription = {
	autoResize: {
		height: false,
		width: false
	},
	show: {
		name: true,
		appboard: true
	}
};

type Must = Omit<Info, keyof typeof defaultModuleDescription> & Partial<typeof defaultModuleDescription>


export function Register(info: Must, connector?: Function) {
	store.dispatch(addRoute({ ...defaultModuleDescription, ...info, component: info.name }));
	return function(target: any) {
		console.log("Registering component", { name: info.name, component: target.name });
		const component = connector ? connector(target) : target;
		addComponent(info.path, component);
		return target;
	};
}
