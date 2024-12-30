import React, { useEffect } from "react";
import Frame from "./frame/Frame";
import { Router } from "./router/Router";
import { useAppDispatch } from "@store";
import { initApp } from "@modules/workflow/workflow.async.actions";

export function Application() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initApp());
	}, []);

	return (
		<Frame>
			<Router />
		</Frame>
	);
}

export default Application;
