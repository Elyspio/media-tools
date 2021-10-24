import React from "react";
import Button from "@material-ui/core/Button";
import {TextField, Typography} from "@material-ui/core";
import {promises as fs} from "fs";
import * as path from "path";
import {SelectFolder} from "../../../common/os";
import {Register} from "../../../../decorators/Module";
import "./Renamer.scss";
import {getAppParams} from "../../../../../main/util/args";
import {Logger} from "../../../../../main/util/logger";
import {resolve} from "inversify-react";
import {FilesService} from "../../../../../main/services/files/files.service";
import {DependencyInjectionKeys} from "../../../../../main/services/dependency-injection/dependency-injection.keys";


interface State {
	episodes: Episode[]
	name: string,
	min?: number,
	max?: number,
	replaceOptions: {
		search?: string,
		replaceWith?: string
	}
}

interface Episode {
	file: string,
	num: number,
	extension: string
}

@Register({name: "Renamer", path: "/renamer"})
export class Renamer extends React.Component<{}, State> {


	@resolve(DependencyInjectionKeys.files)
	filesService!: FilesService;

	override state: State = {
		episodes: [],
		replaceOptions: {},
		name: ""
	};
	private logger = Logger(Renamer);

	override async componentDidMount() {
		const appParams = getAppParams();
		this.logger.info("params", appParams);
		if (appParams.folder) {
			const files = await this.filesService.list(appParams.folder);
			await this.onFileSelect(files);
		}
	}

	override render() {

		const {name, episodes, min, max, replaceOptions} = this.state;

		let options: JSX.Element | null = null;
		if (episodes.length > 0) {
			options = <div className="options">

				<div className="classic">
					<TextField
						id={"renamer-new-name-input"}
						label={"Futur nom"}
						onChange={this.onNameChange}
						fullWidth
						error={!(name !== undefined && name.length > 0)}
					/>

					<div className="nums">
						<Typography className={"line"} variant={"overline"}>Début: {min}</Typography>
						<Typography className={"line"} variant={"overline"}>Fin: {max}</Typography>
					</div>

				</div>

				<div className="example">
					<TextField
						className={"line"}
						disabled
						label={"Origin"}
						value={episodes[0].file}/>

					<TextField
						className={"line"}
						disabled
						label={"Renamed"}
						value={this.getNewEpisodeName(episodes[0], "1")}/>
				</div>

				<Button
					color={"secondary"}
					onClick={() => this.rename()}
					disabled={name.length === 0}
				>
					Rename files
				</Button>

				<div className="replace-char">

					<div className={"actions"}>
						<TextField onChange={this.setSearchChar} label={"Search"}/>
						<TextField onChange={this.setReplaceChar} label={"Replace with"}/>
						<Button
							variant={"outlined"}
							color={"secondary"}
							onClick={this.replaceChar}
							disabled={(replaceOptions.search?.length ?? 0) === 0}
						>
							Replace char
						</Button>
					</div>

				</div>

			</div>;
		}

		return (
			<div className={"Renamer"}>
				<SelectFolder onChange={this.onFileSelect} mode={"file"}/>
				{options}
			</div>
		);
	}

	private onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({
			name: e.target.value
		});
	};
	private onFileSelect = (files: string[]) => {
		this.logger.info("files", files);
		if (files.length) {

			const trim = (str: string) => str
				.replace(/-_/g, " ")
				.replace(/\./g, " . ")
				.replace(/([0-9]*)E([0-9]+)/g, "$1 E $2");

			let fileNames = files.map(trim);

			let numberIndex = this.findNumIndex(fileNames);

			this.logger.info("numberIndex", numberIndex);
			let spited = fileNames.map(file => file.split(" "));
			this.logger.info("fileNames", fileNames);
			const episodes: Episode[] = fileNames.map((name, index) => ({
				file: files.find(file => trim(file) === name) as string,
				num: Number.parseInt(spited[index][numberIndex]),
				extension: this.findExtension(name) as string
			}));
			this.logger.info("episodes", episodes);

			const min = episodes.reduce((ep1, ep2) => ep1.num < ep2.num ? ep1 : ep2).num;
			const max = episodes.reduce((ep1, ep2) => ep1.num > ep2.num ? ep1 : ep2).num;

			this.setState({
				episodes: episodes,
				min,
				max
			});
		}

	};

	// region rename

	private findNumIndex = (filenames: string[]) => {
		this.logger.info("filenames", filenames);
		if (filenames.length === 1) {
			const splited = filenames[0].split(" ");
			let i = 0;
			for (; i < splited.length; i++) {
				if (!Number.isNaN(Number(splited[i]))) {
					return i;
				}
			}
		}
		if (filenames.length > 1) {
			const splited = filenames.map(file => file.split(" "));
			const littleOne = splited.reduce((a, b) => a.length < b.length ? a : b);
			for (let index = 0; index < littleOne.length; index++) {
				if (Number.isNaN(Number(splited[0][index]))) continue;
				const possibleNum = Number.parseInt(splited[0][index]);
				if (possibleNum + 1 === Number.parseInt(splited[1][index])) return index;
			}
		}

		return -1;
	};

	private findExtension = (filename: string) => {
		const last = filename.split(" ").pop();
		if (last) {
			let index: number = -1;
			for (let i = last.length; i > 0; i--) {
				if (last[i] === ".") {
					index = i;
					break;
				}
			}
			return last.slice(index + 1);
		}
		return undefined;

	};

	private getNewEpisodeName = (episode: State["episodes"][number], num: string) => {
		const name = this.state.name.trim();
		return `${path.dirname(episode.file)}${path.sep}${name} ${num}.${episode.extension}`;
	};

	private rename = async (): Promise<any> => {

		if (this.state.min === undefined || this.state.max === undefined) return Promise.reject();

		let name = this.state.name?.trim();
		if (!(name !== undefined && name?.length > 0)) return Promise.reject();
		this.setState({
			episodes: []
		});
		return Promise.all(this.state.episodes.map((episode: Episode) => {
			return new Promise<void>(async resolve => {
				const num = this.padWithZeros(episode.num, this.state.max!!.toString().length);
				await fs.rename(episode.file, this.getNewEpisodeName(episode, num));
				resolve();
			});
		}));
	};

	// endregion rename

	// region replace char


	private setReplaceChar = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		e.persist();
		this.setState(prev => ({
			...prev,
			replaceOptions: {
				...prev.replaceOptions,
				replaceWith: e.target.value
			}
		}));
	};

	private setSearchChar = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		e.persist();
		this.setState(prev => ({
			...prev,
			replaceOptions: {
				...prev.replaceOptions,
				search: e.target.value
			}
		}));
	};

	private replaceChar = async () => {

		let {replaceWith, search} = this.state.replaceOptions;

		await Promise.all(this.state.episodes.map(async episode => {
			if (replaceWith && search) {
				const newFileName = path.basename(episode.file).replace(new RegExp(this.escapeRegex(search), "g"), replaceWith);
				this.logger.info(JSON.parse(JSON.stringify(this.state)));
				await fs.rename(episode.file, path.join(path.dirname(episode.file), newFileName));
			}
		}));

	};

	// endregion replace char

	// region utils

	private escapeRegex = (str: string) => {
		return str.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, "\\$&");
	};


	private padWithZeros(number: number, length: number) {
		let n: string = "" + number;
		while (n.length < length) {
			n = "0" + n;
		}
		return n;
	}

	// endregion utils
}

