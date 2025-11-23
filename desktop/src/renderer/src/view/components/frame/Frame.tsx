import { ReactNode } from "react";
import "./Frame.scss";
import { Paper } from "@mui/material";
import Titlebar from "./titlebar/Titlebar";
import { ResourceUtilization } from "./resource-utilization/ResourceUtilization";

type FrameProps = {
	children: ReactNode;
};

export function Frame({ children }: Readonly<FrameProps>) {
	const main = <div className="main">{children}</div>;
	return (
		<Paper square className={"Frame"}>
			<Titlebar title={window.preload.config.appName} />
			{main}
			<ResourceUtilization />
		</Paper>
	);
}
