import { addRoute } from '../store/module/router/action';
import { store } from '../store';
import { addComponent, ModuleDescription } from '../store/module/router/reducer';

export function Register(info: Omit<ModuleDescription, 'component'>, connector?: Function) {
    store.dispatch(addRoute({ ...info, component: info.name}));
    return function(target: any) {
        console.log('Registering component', { name: info.name, component: target.name });
        const component = connector ? connector(target) : target;
        addComponent(info.path, component )
        return target;
    };
}
