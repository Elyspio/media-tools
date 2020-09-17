import { ModuleDescription } from '../store/module/components/action';
import { setApp } from '../components/router/components';

export function Register(info: Omit<ModuleDescription, 'component'>) {
    return function(target: any) {
        console.log('Registering component', { name: info.name, component: target.name });
        setApp({ ...info, component: target });
        return target;
    };

}
