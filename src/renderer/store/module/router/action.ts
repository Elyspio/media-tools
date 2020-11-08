import { createAction as _createAction } from "@reduxjs/toolkit";
import { ModuleDescription } from "./reducer";


const createAction = <T>(type: string) => _createAction<T>(`router/${type}`);

export const setPath = createAction<string>("setPath");
export const addRoute = createAction<ModuleDescription>("addRoute");
