import {createAction as _createAction} from "@reduxjs/toolkit";


const createAction = <T>(type: string) => _createAction<T>(`components/${type}`)

export const register = createAction<ModuleDescription>("register")
export const setCurrent = createAction<string | undefined>("setCurrent")
export type ModuleDescription = {
	name: string,
	description?: string,
	icon?: string,
}
