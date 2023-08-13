import React, { useMemo } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { StoreState, useAppSelector } from "@store";
import { useAppDimension } from "@hooks/useAppDimension";
import { Torrent, TorrentState } from "@ctrl/qbittorrent";
import { createSelector } from "reselect";
import { Typography } from "@mui/material";
import * as dayjs from "dayjs";

const keys = ["id", "name", "dlspeed", "progress", "eta", "size", "state", "priority"] as const;
type Keys = (typeof keys)[number];

function getTorrentStateStr(state: TorrentState) {
	switch (state) {
		case TorrentState.Error:
			return ["Error"];

		case TorrentState.PausedUP:
		case TorrentState.PausedDL:
			return ["Paused", "#09a0b4"];

		case TorrentState.QueuedUP:
		case TorrentState.QueuedDL:
			return ["Queued", "#09b49a"];

		case TorrentState.Uploading:
			return ["Uploading", "#b40978"];

		case TorrentState.StalledDL:
		case TorrentState.StalledUP:
			return ["Stalled", ""];

		case TorrentState.CheckingUP:
		case TorrentState.CheckingDL:
			return ["Checking", ""];

		case TorrentState.Downloading:
			return ["Downloading", "#ff8200"];

		case TorrentState.ForcedDL:
		case TorrentState.ForcedUP:
			return ["Forced", ""];

		case TorrentState.MissingFiles:
			return ["Missing files", "#b40909"];
	}

	return ["", undefined];
}

const columns: Record<Keys, GridColDef & { field: Keys }> = {
	id: { field: "id", headerName: "id", width: 0 },
	priority: {
		field: "priority",
		headerName: "#",
		width: 90,
		type: "number",
		renderCell: ({ value }) => {
			return value === 0 ? "*" : value;
		},
	},
	name: {
		field: "name",
		headerName: "Name",
		flex: 1,
		renderCell: (params) => {
			const val = params.value as string;
			return <Typography title={val}>{val}</Typography>;
		},
	},
	progress: {
		field: "progress",
		headerName: "Done",
		width: 130,
		type: "string",
		renderCell: (params) => {
			const val = Number(params.value) * 100;
			return `${val.toFixed(2)}%`;
		},
	},
	state: {
		field: "state",
		headerName: "State",
		width: 130,
		renderCell: (params) => {
			const val = params.value as TorrentState;
			const [str, color] = getTorrentStateStr(val);
			return <Typography style={{ color }}>{str}</Typography>;
		},
	},
	dlspeed: {
		field: "dlspeed",
		headerName: "Download speed",
		width: 185,
		type: "string",
		renderCell: (params) => {
			const row = params.row as Torrent;
			const val = Number(params.value) / 1024 ** 2;
			return row.state === TorrentState.Downloading ? `${val.toFixed(2)} Mo/s` : "N/A";
		},
	},
	eta: {
		field: "eta",
		headerName: "ETA",
		width: 120,
		renderCell: (params) => {
			const value = params.value === 8640000 ? "N/A" : dayjs.duration(params.value as number, "seconds").humanize();

			console.log(value);

			return value;
		},
	},
	size: {
		field: "size",
		headerName: "Size",
		width: 150,
		type: "number",
		renderCell: (params) => {
			const val = Number(params.value) / 1024 ** 3;
			return `${val.toFixed(2)} GB`;
		},
	},
};

Object.values(columns).forEach((col) => {
	col["align"] ??= "right";
	col["headerAlign"] ??= "right";
	col["sortable"] = false;
});

columns.name.headerAlign = columns.name.align = "left";

const allColumns = [columns.id, columns.priority, columns.name, columns.progress, columns.state, columns.dlspeed, columns.eta, columns.size];

const smallColumns = [columns.id, columns.priority, columns.name, columns.state, columns.progress];

export type PopoverInfo = {
	mouseX?: number;
	mouseY?: number;
	torrent?: Record<Keys, any>;
};

const torrentListSelector = createSelector([(s: StoreState) => s.torrent.list], (list) => ({ data: list }));
type TorrentDataGridProps = {
	setPopoverPosition: (state: PopoverInfo) => void;
};

export function TorrentDataGrid({ setPopoverPosition }: TorrentDataGridProps) {
	const { data } = useAppSelector(torrentListSelector);

	const { width } = useAppDimension();

	const rows = useMemo<{ [key in Keys]: any }[]>(() => {
		return data.map((torrent: Torrent) => ({
			name: torrent.name,
			dlspeed: torrent.dlspeed,
			eta: torrent.eta,
			progress: torrent.progress,
			size: torrent.size,
			id: torrent.hash,
			state: torrent.state,
			priority: torrent.priority,
		}));
	}, [data]);

	const onCellClick = React.useCallback(
		(torrent: GridCellParams, event: React.MouseEvent) => {
			event.preventDefault();
			setPopoverPosition({
				mouseX: event.clientX - 2,
				mouseY: event.clientY - 4,
				torrent: torrent.row as any,
			});
		},
		[setPopoverPosition],
	);

	return (
		<DataGrid
			sortModel={[{ sort: "asc", field: "priority" }]}
			isRowSelectable={() => false}
			sortingMode={"client"}
			onCellClick={onCellClick}
			rows={rows}
			columns={width > 1000 ? allColumns : smallColumns}
		/>
	);
}
