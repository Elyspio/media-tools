import React, { Component } from "react";
import { ListItem } from "@material-ui/core";
import "./Process.scss";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ProcessData } from "./type";

interface Props {
	data: ProcessData
}


class Process extends Component<Props> {
	override render() {
		const { data } = this.props;
		return (
			<ListItem className={"Process"}>
				<Typography
					className={"name"}
					title={data.media.file.name}>{data.media.file.name}
				</Typography>
				<LinearProgress
					className={"bar"}
					variant="determinate"
					value={data.percentage} />
				<p>{data.percentage.toFixed(2)}%</p>
			</ListItem>
		);
	}
}

export default Process;
