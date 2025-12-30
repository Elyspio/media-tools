import { ReactNode } from "react";
import "./Frame.scss";
import { Paper, Stack } from "@mui/material";
import Titlebar from "./titlebar/Titlebar";
import { ResourceUtilization } from "./resource-utilization/ResourceUtilization";
import { useMatches } from "react-router";

type FrameProps = {
	children: ReactNode;
};

export function Frame({ children }: Readonly<FrameProps>) {
	const route = useMatches().at(-1);

	return (
		<Paper square className={"Frame"}>
			<Titlebar title={window.preload.config.appName} subtitle={route?.id === "0-0" ? undefined : route?.id} />
			<Stack component={"main"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
				{children}
			</Stack>
			<ResourceUtilization />
		</Paper>
	);
}
