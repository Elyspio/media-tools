import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import { Alert, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { File, Media, ProcessData } from "./type";
import { MediaService } from "../../../../../main/services/media/media.service";
import * as path from "path";
import List from "@mui/material/List";
import Process from "./process/Process";
import "./Encoder.scss";
import { register } from "../../../../decorators/Module";
import { SelectFolder } from "../../../common/os";
import AlertTitle from "@mui/material/AlertTitle";
import Link from "@mui/material/Link";
import { withContext } from "../../../common/hoc/withContext";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import OnFinishAction from "./OnFinishAction";
import { convert } from "../../../../store/module/encoder/encoder.action";
import { useAppSelector } from "../../../../store";
import { encoders } from "../../../../../config/media/encoder";
import { getAppParams } from "../../../../../main/utils/args";
import { Logger } from "../../../../../main/utils/logger";
import {
	setCurrentProcess,
	setFFmpegInstalled,
	setFormat,
	setMedias,
	setProcesses as setProcessStore,
	setProgress,
	stopCurrentProcess,
} from "../../../../store/module/media/media.action";
import { FilesService } from "../../../../../main/services/files/files.service";
import { useInjection } from "inversify-react";

function Encoder() {
	const logger = React.useMemo(() => Logger(Encoder), []);

	const services = {
		files: useInjection(FilesService),
		media: useInjection(MediaService),
	};

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
		action,
		encoder,
		media: { medias, process: processes },
	} = useAppSelector(state => ({
		action: state.encoder.onFinishAction,
		media: state.media,
		encoder: state.encoder,
	}));

	// endregion store

	const setProcesses = React.useCallback(
		(media?: Media[]) => {
			const enc = encoders.find(enc => enc.value.ffmpeg === encoder.format);
			const process: ProcessData[] = (media ?? medias)
				.filter(media => media.property.streams.find(s => s.codec_type === "video")?.codec_name !== enc?.value.ffprobe)
				.map(media => ({
					percentage: 0,
					media,
				}));

			actions.setProcessStore(process);
		},
		[actions, encoder, medias]
	);

	// region onSelection

	const onFormatChange = React.useCallback(
		async (e: SelectChangeEvent<any>) => {
			dispatch(setFormat(e.target.value));
			setProcesses();
		},
		[dispatch]
	);

	const onFileSelect = React.useCallback(
		async (result: string[]) => {
			const files: File[] = result.map(f => ({ name: f.slice(f.lastIndexOf(path.sep)), path: f }));

			const media: Media[] = await Promise.all(
				files.map(async file => ({
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

	const doAction = React.useCallback(async () => {
		if (encoder.currentProcessPid) {
			await actions.stopCurrentProcess();
		} else {
			await actions.convert();
		}
	}, [actions, encoder]);

	React.useEffect(() => {
		(async () => {
			await services.media.checkIfFFmpegInstalled();

			const appParams = getAppParams();
			if (appParams.folder) {
				await onFileSelect(await services.files.list(appParams.folder));
			}
		})();
	}, [services.media, services.files]);

	let softInstalled = encoder.isSoftInstalled;

	const { optionsUi, actionsUi } = React.useMemo(() => {
		const optionsUi = (
			<div className={"options"}>
				<InputLabel id="demo-customized-select-label">Encoder</InputLabel>
				<Select labelId="demo-customized-select-label" id="demo-customized-select" value={encoder.format} onChange={onFormatChange}>
					{encoders.map(encoder => (
						<MenuItem value={encoder.value.ffmpeg} key={encoder.value.ffmpeg}>
							{encoder.type} - {encoder.format}
						</MenuItem>
					))}
				</Select>
			</div>
		);

		const actionsUi = (
			<Grid container className="actions" spacing={4}>
				<Grid item>
					<Button color={"secondary"} onClick={doAction}>
						{encoder.currentProcessPid ? "Stop" : "Encode Files"}
					</Button>
				</Grid>
				<Grid item></Grid>
			</Grid>
		);

		return {
			actionsUi: medias.length ? actionsUi : null,
			optionsUi: medias.length ? optionsUi : null,
		};
	}, [encoder, medias.length]);

	const processUi = React.useMemo(() => {
		if (processes) {
			return (
				<div className={"processes"}>
					<List className={"content"}>
						{processes.map(p => (
							<Process key={p.media.file.name} data={p} />
						))}
					</List>
				</div>
			);
		}
		return null;
	}, [processes]);

	return (
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
				<>
					<Alert severity="error">
						<AlertTitle>This module requires FFmpeg</AlertTitle>
						It can be downloaded <Link href="https://ffmpeg.org/download.html">here</Link>
					</Alert>
				</>
			)}

			{softInstalled === undefined && (
				<>
					<Alert severity="info">
						<AlertTitle>Please wait</AlertTitle>
						Checking if FFmpeg is installed
					</Alert>
				</>
			)}
		</div>
	);
}

register(
	Encoder,
	{
		name: "Encoder",
		description: "Encode video in different formats",
		path: "/encoder",
	},
	withContext({
		items: [
			{
				label: "Action",
				show:
					() =>
					({ close }) =>
						<OnFinishAction close={close} />,
			},
		],
	})
);
