import React from "react";
import "./AppBoard.scss";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { register } from "../../../decorators/Module";
import { setPath } from "@modules/router/router.action";
import { ContextMenuWrapper } from "../../common/hoc/withContextMenu";
import { AppBoardContextMenu } from "./AppBoardContextMenu";
import { useAppDispatch, useAppSelector } from "@store";
import { ModuleDescription } from "@modules/router/router.reducer";
import { AppBoardShow } from "@/config/configuration";

export function AppBoard() {
	const apps = useAppSelector((state) => {
		const config = state.config.current;
		const appsRoute = Object.keys(state.routing.routes);
		let apps = appsRoute.map((route) => state.routing.routes[route]);
		if (!config.appboard.show.includes(AppBoardShow.hidden)) apps = apps.filter((app) => app.show.appboard);
		if (!config.appboard.show.includes(AppBoardShow.external)) apps = apps.filter((app) => !app.external);
		if (!config.appboard.show.includes(AppBoardShow.internal)) apps = apps.filter((app) => app.external);

		apps.sort((a1, a2) => a1.name.localeCompare(a2.name));

		return apps;
	});

	const dispatch = useAppDispatch();

	const setCurrent = React.useCallback((path: ModuleDescription["path"]) => () => dispatch(setPath(path)), [dispatch]);

	return (
		<ContextMenuWrapper
			items={[
				{
					label: "Filter",
					show: ({ close }) => <AppBoardContextMenu close={close} />,
				},
			]}
		>
			<div className={"AppBoard"}>
				{apps.map((app) => (
					<Tooltip title={app.description ?? ""} key={app.name}>
						<Button color={app.external ? "secondary" : "primary"} size={"large"} className={"app"}
						        variant={"outlined"} onClick={setCurrent(app.path)}>
							{app.name}
						</Button>
					</Tooltip>
				))}
			</div>
		</ContextMenuWrapper>
	);
}

register(AppBoard, { name: "AppBoard", path: "/", show: { appboard: false, name: false } });
