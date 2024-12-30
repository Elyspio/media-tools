import { Middleware } from "@reduxjs/toolkit";

export const logErrorMiddleware: Middleware = () => (next) => (action) => {
	action = JSON.parse(JSON.stringify(action));

	if (isRejectedAction(action)) {
		console.error(new Error(`AsyncAction rejected ${action.type} ${action.error.stack}`), { arg: action.meta.arg });
	}

	return next(action);
};

type RejectedAction<T = unknown> = {
	type: string;
	meta: {
		arg: T;
	};
	error: {
		name: string;
		message: string;
		stack: string;
	};
};

function isRejectedAction(action: any): action is RejectedAction {
	return action.type.toString().endsWith("/rejected") && "error" in action;
}
