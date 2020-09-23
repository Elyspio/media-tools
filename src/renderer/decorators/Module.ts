import { ModuleDescription } from '../store/module/components/action';
import { setApp } from '../components/router/components';

export function Register(info: Omit<ModuleDescription, 'component'>, connector?: Function) {
    return function(target: any) {
        console.log('Registering component', { name: info.name, component: target.name });
        setApp({ ...info, component: connector ? connector(target) : target });
        return target;
    };


}
