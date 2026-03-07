import React, { useEffect, useMemo } from "react";
import { Autocomplete, Box, Button, Stack, TextField, Typography } from "@mui/material";
import "./Encoder.scss";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useAppSelector } from "@store";
import { SelectFolder } from "../../shared/nodes/SelectFolder";
import { setCurrentProcess } from "@modules/process/process.actions";
import { convertMedia, setupFfmpeg, stopConvertMedia } from "@modules/encoder/encoder.async.actions";
import { encodersSelectors } from "@modules/encoder/encoders.selectors";
import { setFormat } from "@modules/encoder/encoder.reducer";
import { setMedias } from "@modules/media/media.async.actions";
import type { Encoder as EncoderType } from "@shared/types/ffmpeg.types";
import { PlayArrow, Stop } from "@mui/icons-material";
import type { FileInfo } from "@shared/types/dialog.types";
import { EncoderDashboard } from "@components/internal/encoder/EncoderDashboard";
import { convertSizeToHumanFormat } from "@view/utils/data.utils";
import { FFmpegNotInstalledAlert } from "@components/internal/encoder/FFmpegNotInstalledAlert";

export function Encoder() {
	const [manufacturer, setManufacturer] = React.useState<string>();

	const dispatch = useDispatch();

	const isFfmpegInstalled = useAppSelector(encodersSelectors.ffmpeg.isAvailable);
	const encoders = useAppSelector(encodersSelectors.ffmpeg.encoders);
	const files = useAppSelector((s) => s.media.data);
	const format = useAppSelector((s) => s.encoder.current.format);
	const encoding = useAppSelector((s) => s.encoder.current.pids.length > 0);

	const actions = useMemo(
		() =>
			bindActionCreators(
				{
					setFormat,
					setCurrentProcess,
					setMedias,
					stopConvertMedia,
					convert: convertMedia,
					setupFfmpeg,
				},
				dispatch
			),
		[dispatch]
	);

	useEffect(() => {
		actions.setupFfmpeg();
	}, [actions]);

	// endregion store

	const onFormatChange = React.useCallback(
		(_: React.SyntheticEvent, val: EncoderType | null) => {
			dispatch(setFormat(val?.id));
		},
		[dispatch]
	);

	const onFileSelect = React.useCallback(
		(result: FileInfo[]) => {
			actions.setMedias(result);
		},
		[actions]
	);

	const manufacturers = useMemo(() => {
		return [...new Set(encoders.flatMap((e) => e.manufacturer))];
	}, [encoders]);

	const actionBtn = useMemo(() => {
		if (!format) return null;

		if (encoding)
			return (
				<Button size={"small"} color={"error"} variant="outlined" startIcon={<Stop />} onClick={() => actions.stopConvertMedia()}>
					Cancel
				</Button>
			);

		return (
			<Button size={"small"} variant="outlined" startIcon={<PlayArrow />} onClick={() => actions.convert()}>
				Encode
			</Button>
		);
	}, [actions, encoding, format]);

	return (
		<Stack height={"100%"} minHeight={0} padding={2} spacing={1} alignItems={"center"} justifyContent={"center"}>
			{isFfmpegInstalled && (
				<Stack spacing={1.5} height={"100%"} minHeight={0} width={"100%"}>
					<Stack spacing={2}>
						<Stack spacing={3} direction={"row"} justifyContent={"flex-start"} alignItems={"flex-end"}>
							<SelectFolder variant={"outlined"} onChange={onFileSelect} mode={"files"} />

							<Autocomplete
								sx={{ width: 200 }}
								onChange={(_, v) => setManufacturer(v)}
								renderInput={(params) => <TextField {...params} size={"small"} variant={"standard"} fullWidth label="Manufacturer" />}
								options={manufacturers}
								disableClearable
							/>
							{manufacturer && (
								<Autocomplete
									sx={{ width: 150 }}
									onChange={onFormatChange}
									getOptionLabel={(option) => option.id}
									renderInput={(params) => <TextField {...params} size={"small"} variant={"standard"} fullWidth label="Encoder" />}
									options={encoders.filter((e) => e.manufacturer === manufacturer)}
									disableClearable
								/>
							)}
						</Stack>
					</Stack>

					{files.length > 0 && (
						<>
							<Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"} minHeight={0} flex={1}>
								<EncoderDashboard />
							</Box>

							<Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
								<Typography variant="caption" color="text.secondary">
									Total: {files.length} files • {convertSizeToHumanFormat(files.reduce((acc, f) => acc + f.file.size, 0))}
								</Typography>

								{actionBtn}
							</Stack>
						</>
					)}
				</Stack>
			)}

			{!isFfmpegInstalled && <FFmpegNotInstalledAlert />}
		</Stack>
	);
}
