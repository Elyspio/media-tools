import React from "react";
import { StoreState } from "../../store/reducer";
import { connect, ConnectedProps } from "react-redux";
import Module from "../modules/Module";
import { setPath } from "../../store/module/router/action";
import { getComponent } from "../../store/module/router/reducer";
import { getUriParam } from "../../util/url";


interface Props extends ConnectedProps<typeof connector> {
}

function Router(props: Props) {

	const route = getUriParam("route", {});

	if (route) {
		props.setPath(route);
	}

	if (!props.current) return null;

	return <Module info={props.current}>
		<props.current />
	</Module>;
}

const mapStateToProps = (state: StoreState) => ({
	current: getComponent(state.routing.path),
	path: state.routing.path
});

const mapDispatchToProps = (dispatch: Function) => ({
	setPath: (path: string) => dispatch(setPath(path))
});

const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(Router);
