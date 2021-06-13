import React, {useMemo} from 'react';
import {Box, Typography} from "@material-ui/core";
import {DataGrid, GridColumns} from "@material-ui/data-grid";
import {useAsyncState} from "../../../../hooks/useAsyncState";
import {Services} from "../../../../../main/services";
import {Torrent, TorrentState} from "@ctrl/qbittorrent/dist/types";

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

const columns: GridColumns & { field: Keys }[] = [
	{
		field: 'priority', headerName: '#', width: 90, type: "string", renderCell: ({value}) => {
			return value === 0 ? "*" : value
		}
	},
	{
		field: 'name', headerName: 'Name', flex: 1, renderCell: params => {
			const val = params.value as string;
			return <Typography title={val}>{val}</Typography>
		}
	},
	{
		field: 'progress', headerName: 'Done', width: 130, type: "string", renderCell: params => {
			const val = Number(params.value) * 100;
			return `${val.toFixed(2)}%`
		}
	},
	{
		field: 'state', headerName: 'State', width: 130, renderCell: params => {
			const val = params.value as TorrentState;
			let [str, color] = getTorrentStateStr(val);
			return <Typography style={{color}}>{str}</Typography>
		}
	},
	{
		field: 'dlspeed', headerName: 'Download speed', width: 185, type: "string", renderCell: params => {
			const row = params.row as Torrent
			let val = Number(params.value) / (1024 ** 2);
			return row.state === TorrentState.Downloading ? `${val.toFixed(2)} Mo/s` : "N/A";
		}
	},
	{field: 'id', headerName: 'id', width: 0, hide: true,},
	{
		field: 'eta', headerName: 'ETA', width: 120, renderCell: params => {
			return params.value !== 8640000 ? params.value : "N/A";
		}
	},

	{
		field: 'size', headerName: 'Size', width: 150, type: "number", renderCell: params => {
			let val = Number(params.value) / (1024 ** 3);
			return `${val.toFixed(2)} GB`
		}
	},
]

columns.forEach(col => {
	col["align"] ??= "left";
	col["headerAlign"] ??= "left"
})

const TorrentList = () => {


	const {data, reload} = useAsyncState(Services.media.torrent.list, [], 1000);

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


	return (
		<Box className={"TorrentList"}>
			<DataGrid
				rows={rows}
				columns={columns}
			/>
		</Box>
	);
};

export default TorrentList;
