import { useAppSelector } from "@store";
import { useMemo } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Media } from "@components/internal/encoder/type";
import { Box, Chip, IconButton, LinearProgress, Typography } from "@mui/material";
import { Delete, Description } from "@mui/icons-material";
import { convertSizeToHumanFormat } from "@view/utils/data.utils";

export const EncoderDashboard = () => {
	const files = useAppSelector((s) => s.media.data);

	const progresses = useAppSelector((s) => s.encoder.processes.progress);

	const fileStatus = useMemo(
		() =>
			files.reduce(
				(acc, { file }) => {
					const progress = progresses[file.path] * 100 || 0;
					if (progress === 0) {
						acc[file.path] = "En attente";
					} else if (progress > 0 && progress <= 99) {
						acc[file.path] = "En cours";
					} else {
						acc[file.path] = "Terminé";
					}
					return acc;
				},
				{} as Record<string, FileStatus>
			),
		[files, progresses]
	);

	const rows = useMemo((): MediaWithEncoderProps[] => {
		return files.map(
			({ file, property }): MediaWithEncoderProps => ({
				file,
				property,
				status: fileStatus[file.path],
				progress: progresses[file.path] || 0,
			})
		);
	}, [files, fileStatus, progresses]);

	const columns: GridColDef<MediaWithEncoderProps>[] = [
		{
			field: "name",
			headerName: "File",
			flex: 1,
			minWidth: 250,
			align: "center",
			headerAlign: "center",
			renderCell: (params: EncoderGridRenderCellParams) => (
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%" }}>
					<Description sx={{ fontSize: 20, color: "text.secondary" }} />
					<Box sx={{ minWidth: 0 }}>
						<Typography variant="body2" noWrap sx={{ fontWeight: 500 }} title={params.row.file.name}>
							{params.row.file.name}
						</Typography>
					</Box>
				</Box>
			),
		},
		{
			field: "size",
			headerName: "Size",
			width: 130,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			valueGetter: (_, row) => convertSizeToHumanFormat(row.file.size),
		},
		{
			field: "status",
			headerName: "Statut",
			width: 140,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params: EncoderGridRenderCellParams) => (
				<Chip label={params.row.status} size="small" variant="outlined" color={getStatusColor(params.row.status)} sx={{ height: 24, fontSize: "0.75rem" }} />
			),
		},
		{
			field: "progress",
			headerName: "Progression",
			minWidth: 150,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params: EncoderGridRenderCellParams) => (
				<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%", height: "100%" }}>
					<LinearProgress
						variant="determinate"
						value={params.row.progress * 100}
						color={params.row.status === "Terminé" ? "success" : "primary"}
						sx={{ flexGrow: 1, height: 6, borderRadius: 3, bgcolor: "action.hover" }}
					/>
					{/*<Typography variant="caption" sx={{ width: 35, textAlign: "right", fontWeight: "medium" }}>*/}
					{/*	{params.value}%*/}
					{/*</Typography>*/}
				</Box>
			),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 80,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (_: EncoderGridRenderCellParams) => (
				<IconButton
					size="small"
					onClick={() => {
						console.log("TODO");
					}}
					sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
				>
					<Delete fontSize="small" />
				</IconButton>
			),
		},
	];

	return <DataGrid sx={{ maxHeight: "calc(100vh - 230px)" }} hideFooter getRowId={(r) => r.file.path} columns={columns} rows={rows} />;
};

type FileStatus = "En attente" | "En cours" | "Terminé";

type MediaWithEncoderProps = Media & {
	status: FileStatus;
	progress: number;
};

type EncoderGridRenderCellParams = GridRenderCellParams<MediaWithEncoderProps>;

const getStatusColor = (status: FileStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
	switch (status) {
		case "En cours":
			return "primary";
		case "Terminé":
			return "success";
		default:
			return "default";
	}
};
