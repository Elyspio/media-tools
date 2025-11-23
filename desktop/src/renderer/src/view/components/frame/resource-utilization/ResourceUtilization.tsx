import "./ResourceUtilization.scss";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@store";

export function ResourceUtilization() {
	const info = useAppSelector((s) => s.config.system);

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
				<span className={"value"}>{format(info?.cpuLoad)}</span>
			</Box>
			<Box className={"item"}>
				<span className={"label"}>GPU Encode</span>
				<span className={"value"}>{format(info.gpuLoad?.encode)}</span>
			</Box>
			<Box className={"item"}>
				<span className={"label"}>MEM</span>
				<span className={"value"}>{format(info.mem?.current)}</span>
			</Box>
		</Paper>
	);
}
