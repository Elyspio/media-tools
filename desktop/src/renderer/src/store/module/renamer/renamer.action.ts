import { createActionGenerator } from "../../utils/utils.actions";

const createAction = createActionGenerator("renamer");

export type RenamerField = "min" | "max" | "newName" | "search" | "replaceWith";
export const setRenamerField = createAction<{
	field: RenamerField;
	val: string | number;
}>("set-field");
