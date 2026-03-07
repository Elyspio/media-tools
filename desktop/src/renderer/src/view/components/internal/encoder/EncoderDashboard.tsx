import { useAppSelector } from "@store";
import { useMemo } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import type { Media } from "@components/internal/encoder/type";
import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { Description } from "@mui/icons-material";
import { convertSizeToHumanFormat } from "@view/utils/data.utils";
import { SpecialEncodingProgressValues } from "@modules/encoder/encoder.async.actions";

const statusLabels: Record<string, string> = {
	InProgress: "In Progress",
	Pending: "Pending",
	Converted: "Converted",
	Aborted: "Aborted",
};

export const EncoderDashboard = () => {
	const files = useAppSelector((s) => s.media.data);

	const progresses = useAppSelector((s) => s.encoder.processes.progress);

	const fileStatus = useMemo(
		() =>
			files.reduce(
				(acc, { file }) => {
					const progress = progresses[file.path] || 0;

					if (progress === 0) {
						acc[file.path] = "Pending";
					} else if (progress > 0 && progress <= 0.99) {
						acc[file.path] = "InProgress";
					} else if (progress === SpecialEncodingProgressValues.Aborted) {
						acc[file.path] = "Aborted";
					} else {
						acc[file.path] = "Converted";
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
			headerName: "Status",
			width: 140,
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			align: "center",
			headerAlign: "center",
			renderCell: (params: EncoderGridRenderCellParams) => (
				<Chip label={statusLabels[params.row.status]} size="small" variant="outlined" color={getStatusColor(params.row.status)} sx={{ height: 24, fontSize: "0.75rem" }} />
			),
		},
		{
			field: "progress",
			headerName: "Progress",
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
						color={params.row.status === "Converted" ? "success" : "primary"}
						sx={{ flexGrow: 1, height: 6, borderRadius: 3, bgcolor: "action.hover" }}
					/>
				</Box>
			),
		},
	];

	return <DataGrid sx={{ height: "100%" }} hideFooter getRowId={(r) => r.file.path} columns={columns} rows={rows} />;
};

type FileStatus = "InProgress" | "Pending" | "Converted" | "Aborted";

type MediaWithEncoderProps = Media & {
	status: FileStatus;
	progress: number;
};

type EncoderGridRenderCellParams = GridRenderCellParams<MediaWithEncoderProps>;

const getStatusColor = (status: FileStatus): "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" => {
	switch (status) {
		case "InProgress":
			return "primary";
		case "Converted":
			return "success";
		case "Aborted":
			return "error";
		default:
			return "default";
	}
};
