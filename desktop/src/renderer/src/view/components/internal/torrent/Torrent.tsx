import React, { useCallback, useMemo, useState } from "react";
import { Autocomplete, Box, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { NyaaTorrentItem } from "@shared/types/torrent.types";
import { useAppDispatch, useAppSelector } from "@store";
import { searchTorrents, sendTorrent } from "@modules/torrent/torrent.async.actions";
import { torrentActions } from "@modules/torrent/torrent.reducer";
import dayjs from "dayjs";
import { CopyAll, Download, SearchOutlined } from "@mui/icons-material";
import type { GetTorrentGroupedResult } from "@modules/torrent/torrent.types";
import { useModal } from "@hooks/useModal";

const resolutions = ["720p", "1080p", "2160p", "4K", "8K"] as const;

type Resolution = (typeof resolutions)[number];

export function Torrent() {
	const dispatch = useAppDispatch();
	const { query, results, loading, sendingId, parseEpisodeInfos } = useAppSelector((s) => s.torrent);

	const [forceVostfr, setForceVostfr] = useState(true);
	const [forceResolution, setForceResolution] = useState<Resolution>("1080p");

	const search = useCallback(
		(e?: React.SubmitEvent) => {
			e?.preventDefault();
			if (!query.trim()) return;

			let search = query.trim();

			if (forceVostfr) search += " vostfr";

			search += ` ${forceResolution}`;

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

	const [selectedGroup, setSelectedGroup] = useState<GetTorrentGroupedResult>();

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
						)}
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

	const columnsGlobal = useMemo<GridColDef<GetTorrentGroupedResult>[]>(
		() => [
			{
				field: "template",
				headerName: "Title",
				flex: 1,
			},
			{
				field: "min",
				headerName: "Min",
				width: 120,
				headerAlign: "right",
				align: "right",
			},
			{
				field: "max",
				headerName: "Max",
				headerAlign: "right",
				align: "right",
				width: 120,
			},

			{
				field: "actions",
				headerName: "Actions",
				width: 90,
				sortable: false,
				renderCell: ({ row }) => (
					<Stack direction="row" spacing={0.5} alignItems="center" justifyContent={"center"} height={"100%"}>
						<IconButton size="small">
							<CloudDownloadIcon fontSize="inherit" />
						</IconButton>
						{row.min && row.max && (
							<IconButton size="small" onClick={() => onIconButtonClick(row)}>
								<SearchOutlined fontSize="inherit" />
							</IconButton>
						)}
					</Stack>
				),
			},
		],
		[sendToQbittorrent, sendingId]
	);

	const torrents = useMemo(() => [...results].sort((a, b) => a.template.localeCompare(b.template)), [results]);

	const modal = useModal(false);

	const onIconButtonClick = useCallback((torrent: GetTorrentGroupedResult) => {
		modal.setOpen();
		setSelectedGroup(torrent);
	}, []);

	const closeModal = () => {
		modal.setClose();
		setTimeout(() => setSelectedGroup(undefined), 300);
	};

	return (
		<Stack spacing={3} padding={2} height={"100%"} width={"100%"}>
			<form onSubmit={search}>
				<Stack spacing={0.5}>
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
							sx={{ width: 150 }}
							disableClearable
							onChange={(_, v) => setForceResolution(v)}
						/>

						<Box px={1}>
							<IconButton color={"primary"} sx={{ border: 0.5 }} disabled={loading || !query.trim()} type={"submit"}>
								<SearchOutlined />
							</IconButton>
						</Box>
					</Stack>

					<Stack direction={"row"} alignItems={"center"}>
						<FormControlLabel control={<Checkbox size={"small"} checked={forceVostfr} />} checked={forceVostfr} onChange={(_, v) => setForceVostfr(v)} label="vostfr" />
						<FormControlLabel
							control={<Checkbox size={"small"} checked={parseEpisodeInfos} />}
							checked={parseEpisodeInfos}
							onChange={(_, v) => dispatch(torrentActions.setParseEpisodeInfos(v))}
							label="Extract N°"
						/>
					</Stack>
				</Stack>
			</form>

			<Dialog open={modal.open} onClose={closeModal} keepMounted={true} fullWidth maxWidth={"md"}>
				<DialogTitle>{selectedGroup?.template}</DialogTitle>
				<DialogContent>
					<Box flex={1} minHeight={0} sx={{ "& .value-low": { color: "orange" }, "& .value-none": { color: "red" }, "& .value-ok": { color: "limegreen" } }}>
						<DataGrid
							sx={{ height: "100%" }}
							rows={selectedGroup?.data ?? []}
							columns={columns}
							loading={loading}
							getRowId={(row) => row.id}
							disableRowSelectionOnClick
							hideFooter
						/>
					</Box>
				</DialogContent>
			</Dialog>

			<DataGrid columns={columnsGlobal} onRowClick={(params) => setSelectedGroup(params.row)} rows={torrents} getRowId={(row) => row.template} hideFooter />
		</Stack>
	);
}
