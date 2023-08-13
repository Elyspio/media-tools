import * as React from "react";
import { register } from "@/renderer/decorators/Module";
import "./Recap.scss";
import Container from "@mui/material/Container";
import OnFinishAction from "../OnFinishAction";
import Typography from "@mui/material/Typography";

const RecapComponent = () => {
	const finishAction = () => {
		//
	};

	return (
		<Container className={"Recap"}>
			<Typography>Time before action: </Typography>
			<OnFinishAction close={finishAction} />
		</Container>
	);
};

export const Recap = register(RecapComponent, {
	name: "Encoder Recap",
	path: "/encoder/recap",
	show: { appboard: false, name: true },
});
