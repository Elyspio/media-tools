import React from "react";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {File, Media, ProcessData} from "./type";
import {MediaService} from "../../../../../main/services/media/media.service";
import * as fs from "fs-extra";
import * as path from "path";
import List from "@material-ui/core/List";
import Process from "./process/Process";
import "./Encoder.scss";
import {Register} from "../../../../decorators/Module";
import {SelectFolder} from "../../../common/os";

import {Alert} from "@material-ui/lab";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Link from "@material-ui/core/Link";
import {withContext} from "../../../common/hoc/withContext";
import {connect, ConnectedProps} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import OnFinishAction from "./OnFinishAction";
import {runOnFinishAction} from "../../../../store/module/encoder/action";
import {StoreState} from "../../../../store";
import {encoders} from "../../../../../config/media/encoder";
import {getAppParams} from "../../../../../main/util/args";
import {Logger} from "../../../../../main/util/logger";
import {setCurrentProcess, setFormat, setMedias, setProcesses, setProgress, stopCurrentProcess} from "../../../../store/module/media/media.action";
import {FilesService} from "../../../../../main/services/files/files.service";
import {DependencyInjectionKeys} from "../../../../../main/services/dependency-injection/dependency-injection.keys";
import {resolve} from "inversify-react";


const mapStateToProps = (state: StoreState) => ({
	action: state.encoder.onFinishAction,
	media: state.media,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	dispatch: bindActionCreators({
		setProcesses,
		setMedias,
		setFormat,
		setProgress,
		setCurrentProcess,
		stopCurrentProcess,
	}, dispatch)

});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


interface Props extends ReduxTypes {
}

const menu = withContext({
	items: [
		{
			label: "Action",
			show: () => ({close}) => <OnFinishAction close={close}/>
		}
	],
	redux: connector
});

@Register({
	name: "Encoder",
	description: "Encode video in different formats",
	path: "/encoder"
}, menu)
export class Encoder extends React.Component<Props> {


	@resolve(DependencyInjectionKeys.files)
	filesService!: FilesService


	@resolve(DependencyInjectionKeys.media.convert)
	mediaService!: MediaService

	private logger = Logger(Encoder)

	override async componentDidMount() {
		await this.mediaService.checkIfFFmpegInstalled();

		const appParams = getAppParams();
		if (appParams.folder) {
			await this.onFileSelect(await this.filesService.list(appParams.folder));
		}
	}

	override render() {

		let actionsUi = null;
		let optionsUi = null;
		let processUi = null;


		const {encoder, process, medias} = this.props.media;

		if (medias.length > 0) {

			optionsUi = <div className={"options"}>
				<InputLabel
					id="demo-customized-select-label">Encoder</InputLabel>
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					value={encoder.format}
					onChange={this.onFormatChange}
				>
					{encoders.map(encoder => <MenuItem
						value={encoder.value.ffmpeg} key={encoder.value.ffmpeg}>{encoder.type} - {encoder.format}
					</MenuItem>)}
				</Select>
			</div>;


			actionsUi = <div className="actions">
				<Button color={"secondary"} onClick={this.doAction}>
					{this.props.media.encoder.currentProcessPid ? "Stop" : "Encode Files"}
				</Button>
			</div>;
		}


		if (process) {
			processUi = <List className={"processes"}>
				{process.map(p => <Process key={p.media.file.name} data={p}/>)}
			</List>;
		}


		let softInstalled = this.props.media.encoder.isSoftInstalled;
		return (
			<div className={"Encoder"}>

				{softInstalled === true && <>
                    <SelectFolder onChange={this.onFileSelect} mode={"file"} showSelected/>
					{optionsUi}
					{processUi}
					{actionsUi}
                </>}


				{softInstalled === false && <>
                    <Alert severity="error">
                        <AlertTitle>This module requires FFmpeg</AlertTitle>
                        It can be downloaded <Link href="https://ffmpeg.org/download.html">here</Link>
                    </Alert>
                </>}

				{softInstalled === undefined && <>
                    <Alert severity="info">
                        <AlertTitle>Please wait</AlertTitle>
                        Checking if FFmpeg is installed
                    </Alert>
                </>}

			</div>
		);
	}


	private onFormatChange = async (e: React.ChangeEvent<{ name?: string; value: any }>) => {
		this.props.dispatch.setFormat(e.target.value);
		this.setProcesses();
	};

	private onFileSelect = async (result: string[]) => {
		const files: File[] = result.map(f => ({name: f.slice(f.lastIndexOf(path.sep)), path: f}));

		const media: Media[] = await Promise.all(files.map(async (file) => ({
			file: file,
			property: await new MediaService().getInfo(file)
		})));

		this.props.dispatch.setMedias(media);

		if (this.props.media.encoder.format) {
			this.setProcesses(media);
		}

	};

	private doAction = async (): Promise<void> => {

		if (this.props.media.encoder.currentProcessPid) {
			this.stopEncoding();
		} else {
			for (const {media} of this.props.media.process) {
				const output = await this.encodeFile(media);
				const old = path.join(path.dirname(media.file.path), "old");
				await fs.ensureDir(old);
				await fs.move(media.file.path, path.join(old, media.file.name));
				await fs.move(output, media.file.path);
			}

			await runOnFinishAction();
		}
	};

	private encodeFile = (media: Media): Promise<string> => {
		return new Promise(async (resolve) => {

			const process = this.props.media.process.find(p => p.media.file.path === media.file.path);

			if (!process) throw `Invalid State, could not found in store a media with type="${media.file.path}"`;

			this.props.dispatch.setProgress({...process, percentage: 0});

			const outputPath = path.join(path.dirname(media.file.path), "current.mkv");
			const [s, createdProcess] = await new MediaService().convert(media, this.props.media.encoder.format, {outputPath: outputPath});

			this.props.dispatch.setCurrentProcess(createdProcess);

			s.on("progress", async (percentage) => {
				this.logger.info("receving progress", percentage);

			});

			s.on("finished", async () => {
				this.props.dispatch.setProgress({...process, percentage: 100});
				resolve(outputPath);
			});

			this.setState({})
		});
	};

	private setProcesses = (media?: Media[]) => {
		const encoder = encoders.find(encoder => encoder.value.ffmpeg === this.props.media.encoder.format);
		const process: ProcessData[] = (media ?? this.props.media.medias)
			.filter(media => media.property.streams.find(s => s.codec_type === "video")?.codec_name !== encoder?.value.ffprobe)
			.map(media => ({
				percentage: 0,
				media
			}));


		this.props.dispatch.setProcesses(process);
	};


	private stopEncoding = () => {
		this.props.dispatch.stopCurrentProcess();
	}

}


