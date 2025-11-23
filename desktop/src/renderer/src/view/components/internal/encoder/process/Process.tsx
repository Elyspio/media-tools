import React, { useRef } from "react";
import { Grid, LinearProgress, ListItem } from "@mui/material";
import "./Process.scss";
import Typography from "@mui/material/Typography";
import { ProcessData } from "../type";
import dayjs, { Dayjs } from "dayjs";

import updateLocal from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { formatDuration } from "@view/utils/date";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

interface Props {
	data: ProcessData;
}

function Process({ data }: Readonly<Props>) {
	const ref = useRef<Dayjs | null>(null);

	const eta = React.useMemo(() => {
		if (data.percentage === 0) return "Queued";
		if (data.percentage > 0 && ref.current === null) {
			ref.current = dayjs();
		}
		if (data.percentage === 100) {
			ref.current = null;
			return "Done";
		}

		const nbSeconds = dayjs().diff(ref.current, "seconds");

		const timeToWait = ((100 - data.percentage) * nbSeconds) / data.percentage;

		return formatDuration(dayjs.duration(timeToWait, "seconds"));
	}, [data.percentage]);

	return (
		<ListItem className={"Process"}>
			<Grid container direction={"row"} spacing={2}>
				<Grid size={{ xs: 6 }}>
					<Typography className={"name"} title={data.media.file.name}>
						{data.media.file.name}
					</Typography>
				</Grid>

				<Grid size={{ xs: 2 }}>
					<LinearProgress className={"bar"} variant="determinate" title={data.percentage.toString()} value={data.percentage} />
				</Grid>

				<Grid size={{ xs: 2 }}>
					<Typography color={"textPrimary"}>{data.percentage.toFixed(2)}%</Typography>
				</Grid>
				<Grid size={{ xs: 2 }}>
					<Typography color={"textPrimary"} noWrap>
						{eta}
					</Typography>
				</Grid>
			</Grid>
		</ListItem>
	);
}

export default Process;
