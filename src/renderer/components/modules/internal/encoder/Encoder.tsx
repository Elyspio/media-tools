import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import { Alert, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { File, Media, ProcessData } from "./type";
import { MediaService } from "../../../../../main/services/media/media.service";
import * as fs from "fs-extra";
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
import { runOnFinishAction } from "../../../../store/module/encoder/action";
import { useAppSelector } from "../../../../store";
import { encoders } from "../../../../../config/media/encoder";
import { getAppParams } from "../../../../../main/util/args";
import { Logger } from "../../../../../main/util/logger";
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
import { DependencyInjectionKeys } from "../../../../../main/services/dependency-injection/dependency-injection.keys";
import { useInjection } from "inversify-react";

function Encoder() {
	const logger = React.useMemo(() => Logger(Encoder), []);

	const services = {
		files: useInjection<FilesService>(DependencyInjectionKeys.files),
		media: useInjection<MediaService>(DependencyInjectionKeys.media.convert),
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
				},
				dispatch
			),
		[dispatch]
	);

	const {
		action,
		media: { medias, encoder, process: processes },
	} = useAppSelector(state => ({
		action: state.encoder.onFinishAction,
		media: state.media,
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

	// region encode

	const encodeFile = React.useCallback(
		(media: Media): Promise<string> => {
			return new Promise(async resolve => {
				const process = processes.find(p => p.media.file.path === media.file.path);

				if (!process) throw `Invalid State, could not found in store a media with type="${media.file.path}"`;

				actions.setProgress({ ...process, percentage: 0 });

				const outputPath = path.join(path.dirname(media.file.path), "current.mkv");
				const [s, createdProcess] = await new MediaService().convert(media, encoder.format, { outputPath: outputPath });

				actions.setCurrentProcess(createdProcess);

				s.on("progress", async percentage => {
					logger.info("receving progress", percentage);
				});

				s.on("finished", async () => {
					actions.setProgress({ ...process, percentage: 100 });
					resolve(outputPath);
				});
			});
		},
		[actions, encoder]
	);

	const stopEncoding = React.useCallback(() => {
		actions.stopCurrentProcess();
	}, [actions]);

	const doAction = React.useCallback(async (): Promise<void> => {
		if (encoder.currentProcessPid) {
			stopEncoding();
		} else {
			for (const { media } of processes) {
				const output = await encodeFile(media);
				const old = path.join(path.dirname(media.file.path), "old");
				await fs.ensureDir(old);
				await fs.move(media.file.path, path.join(old, media.file.name));
				await fs.move(output, media.file.path);
			}

			await runOnFinishAction();
		}
	}, [stopEncoding, encodeFile]);

	// endregion encode

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
						<SelectFolder onChange={onFileSelect} mode={"file"} showSelected />
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
