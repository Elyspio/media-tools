import React from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import * as dayjs from "dayjs";
import "dayjs/plugin/duration";

import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import { useAppDispatch } from "@store";
import { getTorrents, updateTorrent } from "@modules/torrent/torrent.async.actions";
import { PopoverInfo, TorrentDataGrid } from "./TorrentDataGrid";
import { useInterval } from "@hooks/useInterval";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const initialPopoverPosition: PopoverInfo = {};

const TorrentList = () => {
	const dispatch = useAppDispatch();

	const [popoverPosition, setPopoverPosition] = React.useState(initialPopoverPosition);

	useInterval(() => dispatch(getTorrents()), 1000, [dispatch]);

	const handleClose = React.useCallback(
		async (item?: "resume" | "pause" | "delete") => {
			setPopoverPosition(initialPopoverPosition);

			if (item) {
				await dispatch(
					updateTorrent({
						mode: item,
						hash: popoverPosition.torrent!.id,
					}),
				);
			}
		},
		[popoverPosition, dispatch],
	);

	return (
		<Box className={"TorrentList"}>
			<TorrentDataGrid setPopoverPosition={setPopoverPosition} />

			{popoverPosition.mouseY && popoverPosition.mouseX && (
				<Menu
					keepMounted
					open={true}
					onClose={() => handleClose()}
					anchorReference="anchorPosition"
					anchorPosition={{ top: popoverPosition.mouseY, left: popoverPosition.mouseX }}
				>
					<MenuItem onClick={() => handleClose("resume")}>Resume</MenuItem>
					<MenuItem onClick={() => handleClose("pause")}>Pause</MenuItem>
					<MenuItem onClick={() => handleClose("delete")}>Delete</MenuItem>
				</Menu>
			)}
		</Box>
	);
};

export default TorrentList;
