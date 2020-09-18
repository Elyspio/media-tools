import { ModuleDescription } from '../../store/module/components/action';

const apps: { [key: string]: ModuleDescription } = {};
export const getApp = (name?: string) => name ? apps[name] : undefined;
export const setApp = (module: ModuleDescription) => apps[module.name] = module;
export const listApps = () => Object.values(apps);

