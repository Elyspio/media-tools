import React from "react";
import {register} from "../../../../decorators/Module";
import {useAppSelector} from "../../../../store";
import "./HomeAssistant.scss";


const HomeAssistant = () => {

	const url = useAppSelector(s => s.config.current.endpoints.homeAssistant)

	return <iframe src={url} frameBorder={0} className={"HomeAssistant"}/>
}

export default register(HomeAssistant, {
	name: "Home Assistant",
	external: true,
	path: "/home-assistant",
	show: {
		appboard: true,
		name: true
	}
});
