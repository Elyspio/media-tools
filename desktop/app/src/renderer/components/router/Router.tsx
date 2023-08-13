import React from "react";
import Module from "../modules/Module";
import { setPath } from "@modules/router/router.action";
import { getComponent } from "@modules/router/router.reducer";
import { getUriParam } from "../../utils/url";
import { useAppDispatch, useAppSelector } from "@store";
import { bindActionCreators } from "redux";

export function Router() {
	const route = getUriParam("route", {});

	const { current } = useAppSelector((state) => ({
		current: getComponent(state.routing.path),
	}));

	const dispatch = useAppDispatch();

	const actions = React.useMemo(() => bindActionCreators({ setPath }, dispatch), [dispatch]);

	React.useEffect(() => {
		if (route) {
			actions.setPath(route);
		}
	}, [actions, route]);

	const component = React.useMemo(() => React.createElement(current, {}), [current]);

	if (!current) return null;

	return <Module>{component}</Module>;
}
