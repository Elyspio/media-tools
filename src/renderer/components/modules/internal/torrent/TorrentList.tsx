import React, {useMemo} from 'react';
import {Box, Typography} from "@material-ui/core";
import {DataGrid, GridColumns} from "@material-ui/data-grid";
import {useAsyncState} from "../../../../hooks/useAsyncState";
import {Services} from "../../../../../main/services";
import {Torrent, TorrentState} from "@ctrl/qbittorrent/dist/types";
import {useAppDimension} from "../../../../../main/util/hooks";

const keys = ["id", "name", "dlspeed", "progress", "eta", "size", "state", "priority"] as const
type Keys = typeof keys[number];


function getTorrentStateStr(state: TorrentState) {
	switch (state) {
		case TorrentState.Error:
			return ["Error"]

		case TorrentState.PausedUP:
		case TorrentState.PausedDL:
			return ["Paused", "#09a0b4"]

		case TorrentState.QueuedUP:
		case TorrentState.QueuedDL:
			return ["Queued", "#09b49a"]

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
			return ["Missing files", "#b40909"]
	}

	return ["", undefined]
}


const columns: Record<Keys, GridColumns[number] & { field: Keys }> = {
	id: {field: 'id', headerName: 'id', width: 0, hide: true,},
	priority: {
		field: 'priority', headerName: '#', width: 90, type: "number", renderCell: ({value}) => {
			return value === 0 ? "*" : value
		}
	},
	name: {
		field: 'name', headerName: 'Name', flex: 1, renderCell: params => {
			const val = params.value as string;
			return <Typography title={val}>{val}</Typography>
		}
	},
	progress: {
		field: 'progress', headerName: 'Done', width: 130, type: "string", renderCell: params => {
			const val = Number(params.value) * 100;
			return `${val.toFixed(2)}%`
		}
	},
	state: {
		field: 'state', headerName: 'State', width: 130, renderCell: params => {
			const val = params.value as TorrentState;
			let [str, color] = getTorrentStateStr(val);
			return <Typography style={{color}}>{str}</Typography>
		}
	},
	dlspeed: {
		field: 'dlspeed', headerName: 'Download speed', width: 185, type: "string", renderCell: params => {
			const row = params.row as Torrent
			let val = Number(params.value) / (1024 ** 2);
			return row.state === TorrentState.Downloading ? `${val.toFixed(2)} Mo/s` : "N/A";
		}
	},
	eta: {
		field: 'eta', headerName: 'ETA', width: 120, renderCell: params => {
			return params.value !== 8640000 ? params.value : "N/A";
		}
	},
	size: {
		field: 'size', headerName: 'Size', width: 150, type: "number", renderCell: params => {
			let val = Number(params.value) / (1024 ** 3);
			return `${val.toFixed(2)} GB`
		}
	},
}


Object.values(columns).forEach(col => {
	col["align"] ??= "right";
	col["headerAlign"] ??= "right";
	col["sortable"] = false;
})

columns.priority.sortable = true;
columns.name.headerAlign = columns.name.align = "left"

const allColumns = [
	columns.id,
	columns.priority,
	columns.name,
	columns.progress,
	columns.state,
	columns.dlspeed,
	columns.eta,
	columns.size,
]

const smallColumns = [
	columns.id,
	columns.priority,
	columns.name,
	columns.progress
]


const TorrentList = () => {


	const {data} = useAsyncState(Services.media.torrent.list, [], 1000);

	const rows = useMemo<{ [key in Keys]: any }[]>(() => {

		return data.map((torrent: Torrent) => ({
			name: torrent.name,
			dlspeed: torrent.dlspeed,
			eta: torrent.eta,
			progress: torrent.progress,
			size: torrent.size,
			id: torrent.hash,
			state: torrent.state,
			priority: torrent.priority
		}))
	}, [data]);

	const {width} = useAppDimension();


	return (
		<Box className={"TorrentList"}>
			<DataGrid
				isRowSelectable={() => false}
				sortingMode={"client"}
				rows={rows}
				columns={width > 1000 ? allColumns : smallColumns}
			/>
		</Box>
	);
};

export default TorrentList;
