import { useCallback, useMemo, useState } from "react";
import { Autocomplete, Box, Checkbox, FormControlLabel, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { NyaaTorrentItem } from "@shared/types/torrent.types";
import { useAppDispatch, useAppSelector } from "@store";
import { searchTorrents, sendTorrent } from "@modules/torrent/torrent.async.actions";
import { torrentActions } from "@modules/torrent/torrent.reducer";
import dayjs from "dayjs";
import { CopyAll, Download, SearchOutlined } from "@mui/icons-material";

const resolutions = ["720p", "1080p", "2160p", "4K", "8K"] as const;

type Resolution = (typeof resolutions)[number];

export function Torrent() {
	const dispatch = useAppDispatch();
	const { query, results, loading, sendingId } = useAppSelector((s) => s.torrent);

	const [forceVostfr, setForceVostfr] = useState(true);
	const [forceResolution, setForceResolution] = useState<Resolution>("1080p");

	const search = useCallback(
		(e?: React.FormEvent) => {
			e?.preventDefault();
			if (!query.trim()) return;

			let search = query.trim();

			if (forceVostfr) search += " vostfr";

			search += " " + forceResolution;

			void dispatch(searchTorrents(search))
				.unwrap()
				.catch((error) => {
					toast.error(error instanceof Error ? error.message : "Failed to search nyaa.si");
				});
		},
		[dispatch, forceResolution, forceVostfr, query]
	);

	const sendToQbittorrent = useCallback(
		(row: NyaaTorrentItem) => {
			if (!row.torrentUrl) {
				toast.error("No magnet or torrent URL available for this entry");
				return;
			}
			void dispatch(sendTorrent(row))
				.unwrap()
				.then(() => toast.success("Sent to qBittorrent"))
				.catch((error) => {
					toast.error(error instanceof Error ? error.message : "Failed to send torrent");
				});
		},
		[dispatch]
	);

	const columns = useMemo<GridColDef<NyaaTorrentItem>[]>(
		() => [
			{
				field: "title",
				headerName: "Title",
				flex: 1,
			},
			{
				field: "seeders",
				headerName: "Seed",
				width: 60,
				cellClassName: (params) => {
					if (params.value === 0) return "value-none";
					if (params.value <= 5) return "value-low";
					return "value-ok";
				},
				sortComparator: (v1: number, v2: number) => {
					console.log({ v1, v2 });
					return v1 - v2;
				},
			},
			{
				field: "size",
				headerName: "Size",
				headerAlign: "center",
				align: "right",
				width: 120,
				valueGetter: (_, row) => row.size,
			},

			{
				field: "date",
				headerName: "Date",
				width: 100,
				valueGetter: (_, row) => dayjs(row.date).format("YYYY-MM-DD"),
			},
			{
				field: "actions",
				headerName: "Actions",
				width: 90,
				sortable: false,
				renderCell: ({ row }) => (
					<Stack direction="row" spacing={0.5} alignItems="center" justifyContent={"center"} height={"100%"}>
						{row.torrentUrl.startsWith("https") && (
							<Tooltip title="Download">
								<IconButton size="small" onClick={() => window.open(row.torrentUrl, "_blank")?.focus()}>
									<Download fontSize="inherit" />
								</IconButton>
							</Tooltip>
						)}{" "}
						{row.torrentUrl.startsWith("magnet") && (
							<Tooltip title="Copy Magnet Link">
								<IconButton size="small" onClick={() => void navigator.clipboard.writeText(row.torrentUrl)}>
									<CopyAll fontSize="inherit" />
								</IconButton>
							</Tooltip>
						)}
						<Tooltip title="Send to qBittorrent">
							<IconButton size="small" color="primary" disabled={sendingId === row.id} onClick={() => sendToQbittorrent(row)}>
								<CloudDownloadIcon fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Stack>
				),
			},
		],
		[sendToQbittorrent, sendingId]
	);

	const torrents = useMemo(() => [...results].filter((t) => t.seeders > 0).sort((a, b) => a.title.localeCompare(b.title)), [results]);

	return (
		<Stack spacing={3} padding={2} height={"100%"} width={"100%"}>
			<form onSubmit={search}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
					<TextField
						value={query}
						onChange={(e) => dispatch(torrentActions.setQuery(e.target.value))}
						label="Search nyaa.si"
						variant="standard"
						size="small"
						fullWidth
						placeholder="e.g. Some Anime 1080p"
					/>

					<Autocomplete
						renderInput={(params) => <TextField variant={"standard"} {...params} size={"small"} label={"Resolution"} />}
						options={resolutions}
						value={forceResolution}
						sx={{ width: 200 }}
						disableClearable
						onChange={(_, v) => setForceResolution(v as Resolution)}
					/>
					<FormControlLabel control={<Checkbox size={"small"} checked={forceVostfr} />} checked={forceVostfr} onChange={(_, v) => setForceVostfr(v)} label="vostfr" />

					<Box px={1}>
						<IconButton color={"primary"} sx={{ border: 0.5 }} disabled={loading || !query.trim()} type={"submit"}>
							<SearchOutlined />
						</IconButton>
					</Box>
				</Stack>
			</form>

			<Box flex={1} minHeight={0} sx={{ "& .value-low": { color: "orange" }, "& .value-none": { color: "red" }, "& .value-ok": { color: "limegreen" } }}>
				<DataGrid
					sx={{ height: "100%" }}
					rows={torrents}
					columns={columns}
					loading={loading}
					getRowId={(row) => row.id}
					disableRowSelectionOnClick
					hideFooter
				/>
			</Box>
		</Stack>
	);
}
