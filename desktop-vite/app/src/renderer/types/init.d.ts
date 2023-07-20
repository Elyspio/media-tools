import type { StoreState } from "../store";
import { createWindowCustomOption } from "../../../main/services/electron/dialog.service";

export type InitParams = {
	store: StoreState;
	route: string;
	options: createWindowCustomOption;
};

declare global {
	interface Window {
		params: InitParams;
	}
}
