import { createAction as _createAction } from "@reduxjs/toolkit";
import { ModuleDescription, ModuleDescriptionStore } from "./router.reducer";

const createAction = <T>(type: string) => _createAction<T>(`router/${type}`);

export const setPath = createAction<ModuleDescription["path"]>("setPath");
export const addRoute = createAction<ModuleDescriptionStore>("addRoute");
