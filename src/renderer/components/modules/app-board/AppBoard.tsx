import React from "react";
import "./AppBoard.scss";
import { StoreState } from "../../../store/reducer";
import { connect, ConnectedProps } from "react-redux";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Register } from "../../../decorators/Module";
import { setPath } from "../../../store/module/router/action";
import { withContext } from "../../common/hoc/withContext";
import AppBoardContextMenu from "./AppBoardContextMenu";


const mapStateToProps = (state: StoreState) => {
	const config = state.config.current;

	let apps = Object.values(state.routing.routes);
	if (!config.appboard.show.includes("hidden")) apps = apps.filter(app => app.show.appboard);
	if (!config.appboard.show.includes("external")) apps = apps.filter(app => !app.external);
	if (!config.appboard.show.includes("internal")) apps = apps.filter(app => app.external);

	apps.sort((a1, a2) => a1.name.localeCompare(a2.name));

	return ({
		apps: apps

	});
};
const mapDispatchToProps = (dispatch: Function) => {
	return {
		setCurrent: (path: string) => {
			dispatch(setPath(path));
		}
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const menu = withContext({
	items: [
		{
			label: "Filter",
			show: () => ({ close }) => <AppBoardContextMenu close={close} />
		}
	],
	redux: connector
});

@Register({ name: "AppBoard", path: "/", show: { appboard: false, name: false } }, menu)
class AppBoard extends React.Component<ConnectedProps<typeof connector>> {
	render() {


		return (
			<div className={"AppBoard"}>
				{this.props.apps.map(app =>
					<Tooltip title={app.description ?? ""} key={app.name}>
						<Button color={app.external ? "secondary" : "primary"} size={"large"}
						        className={"app"}
						        variant={"outlined"}
						        onClick={() => this.props.setCurrent(app.path)}>
							{app.name}
						</Button>
					</Tooltip>
				)}
			</div>
		);
	}
}

