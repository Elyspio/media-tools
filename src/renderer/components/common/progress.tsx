import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

type Props = {
	value: number,
	size: {
		circle: string,
		title?: string,
		percentage: string
	}
	label?: string
};

export function CircularProgressWithLabel(props: Props) {

	const { circle, title, percentage } = props.size;


	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" {...props} size={circle} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
			>

				<Typography variant="caption" style={{ fontSize: title }} component="div" color="textSecondary">{`${props.label}`}</Typography>
				<Typography variant="caption" style={{ fontSize: percentage }} component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}
