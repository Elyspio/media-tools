import React, {Component} from "react";
import "./ResourceUtilization.scss";
import {SystemService} from "../../../../main/services/system/system.service";
import {Box} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";


interface State {
	cpuLoad?: number,
	gpuLoad?: { encode: number, decode: number, memory: number },
	memLoad?: number
}

class ResourceUtilization extends Component<{}, State> {

	override state: State = {};

	private timeoutId?: NodeJS.Timeout;

	override componentDidMount() {
		this.timeoutId = setInterval(this.getData, 1000);
	}

	override componentWillUnmount() {
		clearInterval(this.timeoutId as NodeJS.Timeout);
	}

	override render() {

		const format = (number?: number) => {
			let str = "0";
			if (number) {
				str = number.toFixed(2);
				if (number < 0) str = "0" + str;
			}

			return str + "%";
		};


		return (
			<Paper className={"ResourceUtilization"}>
				<Box className={"item"}>
					<span className={"label"}>CPU</span>
					<span className={"value"}>{format(this.state.cpuLoad)}</span>
				</Box>
				<Box className={"item"}>
					<span className={"label"}>GPU Encode</span>
					<span className={"value"}>{format(this.state.gpuLoad?.encode)}</span>
				</Box>
				<Box className={"item"}>
					<span className={"label"}>MEM</span>
					<span className={"value"}>{format(this.state.memLoad)}</span>
				</Box>

			</Paper>
		);
	}

	private getData = async () => {
		const systemService = SystemService.instance;
		const data = await Promise.all([
			systemService.cpuLoad(),
			systemService.gpuLoad(),
			systemService.memoryUsed()
		]);

		this.setState({
			cpuLoad: data[0],
			gpuLoad: data[1],
			memLoad: data[2].current
		});
	};


}

export default ResourceUtilization;
