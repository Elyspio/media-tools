import React from "react";
import { register } from "@/renderer/decorators/Module";
import { useAppSelector } from "@store";
import "./HomeAssistant.scss";

function HomeAssistant() {
	const url = useAppSelector((s) => s.config.current.endpoints.homeAssistant);

	return <iframe src={url} frameBorder={0} className={"HomeAssistant"} />;
}

register(HomeAssistant, {
	name: "Home",
	external: true,
	path: "/home-assistant",
	show: {
		appboard: true,
		name: true,
	},
});
