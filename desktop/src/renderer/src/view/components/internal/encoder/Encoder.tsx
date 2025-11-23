import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import { Alert, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { File, Media, ProcessData } from "./type";
import { MediaService } from "@services/media/media.service";
import * as path from "path";
import List from "@mui/material/List";
import Process from "./process/Process";
import "./Encoder.scss";
import AlertTitle from "@mui/material/AlertTitle";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import OnFinishAction from "./OnFinishAction";
import { convert } from "@modules/encoder/encoder.action";
import { useAppSelector } from "@store";
import { encoders } from "@/config/media/encoder";
import { setFFmpegInstalled, setFormat, setMedias, setProcesses as setProcessStore, setProgress } from "../../../../store/module/media/media.action";
import { EncoderState } from "@modules/encoder/encoder.reducer";
import { ContextMenuWrapper } from "../../shared/hoc/ContextMenuWrapper";
import { SelectFolder } from "../../shared/nodes/SelectFolder";
import { setCurrentProcess } from "@modules/process/process.actions";
import { stopCurrentProcess } from "@modules/process/process.async.actions";

export function Encoder() {
	// region store

	const dispatch = useDispatch();

	const actions = useMemo(
		() =>
			bindActionCreators(
				{
					setProcessStore,
					setFormat,
					setCurrentProcess,
					setFFmpegInstalled,
					setMedias,
					setProgress,
					stopCurrentProcess,
					convert,
				},
				dispatch
			),
		[dispatch]
	);

	const {
		encoder,
		media: { medias, process: processes },
	} = useAppSelector((state) => ({
		action: state.encoder.onFinishAction,
		media: state.media,
		encoder: state.encoder,
	}));

	// endregion store

	const setProcesses = React.useCallback(
		(media?: Media[]) => {
			const enc = encoders.find((enc) => enc.value.ffmpeg === encoder.format);
			const process: ProcessData[] = (media ?? medias)
				.filter((media) => media.property.streams.find((s) => s.codec_type === "video")?.codec_name !== enc?.value.ffprobe)
				.map((media) => ({
					percentage: 0,
					media,
				}));

			actions.setProcessStore(process);
		},
		[actions, encoder, medias]
	);

	// region onSelect

	const onFormatChange = React.useCallback(
		async (e: SelectChangeEvent<EncoderState["format"][]>) => {
			dispatch(setFormat(e.target.value as EncoderState["format"]));
			setProcesses();
		},
		[dispatch, setProcesses]
	);

	const onFileSelect = React.useCallback(
		async (result: string[]) => {
			const files: File[] = result.map((f) => ({ name: f.slice(f.lastIndexOf(path.sep)), path: f }));

			const media: Media[] = await Promise.all(
				files.map(async (file) => ({
					file: file,
					property: await new MediaService().getInfo(file),
				}))
			);

			actions.setMedias(media);

			if (encoder.format) {
				setProcesses(media);
			}
		},
		[actions, encoder, setProcesses]
	);

	// endregion onSelect

	const softInstalled = encoder.isSoftInstalled;

	const doAction = React.useCallback(async () => {
		if (encoder.currentProcessPid) {
			await actions.stopCurrentProcess();
		} else {
			await actions.convert();
		}
	}, [actions, encoder]);

	const { optionsUi, actionsUi } = React.useMemo(() => {
		const optionsUi = (
			<div className={"options"}>
				<InputLabel id="demo-customized-select-label">Encoder</InputLabel>
				<Select labelId="demo-customized-select-label" id="demo-customized-select" value={encoder.format as any} onChange={onFormatChange}>
					{encoders.map((encoder) => (
						<MenuItem value={encoder.value.ffmpeg} key={encoder.value.ffmpeg}>
							{encoder.type} - {encoder.format}
						</MenuItem>
					))}
				</Select>
			</div>
		);

		const actionsUi = (
			<Grid container className="actions" spacing={4}>
				<Grid>
					<Button color={"secondary"} onClick={doAction}>
						{encoder.currentProcessPid ? "Stop" : "Encode Files"}
					</Button>
				</Grid>
			</Grid>
		);

		return {
			actionsUi: medias.length ? actionsUi : null,
			optionsUi: medias.length ? optionsUi : null,
		};
	}, [doAction, encoder.currentProcessPid, encoder.format, medias.length, onFormatChange]);

	const processUi = React.useMemo(() => {
		if (processes) {
			return (
				<div className={"processes"}>
					<List className={"content"}>
						{processes.map((p) => (
							<Process key={p.media.file.name} data={p} />
						))}
					</List>
				</div>
			);
		}
		return null;
	}, [processes]);

	const menuItems = React.useMemo(
		() => [
			{
				label: "Action",
				show: ({ close }: any) => <OnFinishAction close={close} />,
			},
		],
		[]
	);
	return (
		<ContextMenuWrapper items={menuItems}>
			<div className={"Encoder"}>
				{softInstalled === true && (
					<>
						<div className={"header"}>
							<SelectFolder onChange={onFileSelect} mode={"file"} />
							{optionsUi}
						</div>
						{processUi}
						<div className="actions">{actionsUi}</div>
					</>
				)}

				{softInstalled === false && (
					<Alert severity="error">
						<AlertTitle>This module requires FFmpeg</AlertTitle>
						It can be downloaded <Link href="https://ffmpeg.org/download.html">here</Link>
					</Alert>
				)}

				{softInstalled === undefined && (
					<Alert severity="info">
						<AlertTitle>Please wait</AlertTitle>
						Checking if FFmpeg is installed
					</Alert>
				)}
			</div>
		</ContextMenuWrapper>
	);
}
