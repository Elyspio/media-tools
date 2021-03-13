import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { promises as fs } from "fs";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as path from "path";
import { SelectFolder } from "../../../common/os";
import { Register } from "../../../../decorators/Module";
import "./Renamer.scss";
import { getAppParams } from "../../../../../main/util/args";
import { Services } from "../../../../../main/services";


interface State {
	episodes: Episode[]
	name?: string,
	min?: number,
	max?: number,
	percentage?: number,
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

@Register({ name: "Renamer", path: "/renamer" })
export class Renamer extends React.Component<{}, State> {


	async componentDidMount() {
		const appParams = getAppParams();
		console.log("params", appParams);
		if (appParams.folder) {
			const files = await Services.files.list(appParams.folder);
			await this.onFileSelect(files);
		}
	}

	constructor(props: {}) {
		super(props);
		this.state = {
			episodes: [],
			replaceOptions: {}
		};
	}

	render() {
		let options: JSX.Element | null = null;
		if (this.state.episodes.length > 0) {
			options = <div className="options">
				<div className="classic">
					<TextField label={"Futur nom"} onChange={this.onNameChange}
					           error={!(this.state.name !== undefined && this.state.name.length > 0)} />
					<p>Début: {this.state.min}</p>
					<p>Fin: {this.state.max}</p>
					<Button color={"secondary"} onClick={() => this.rename()}>
						Rename files
					</Button>
				</div>

				<div className="replace-char">
					<TextField id={"episode-example-name"} disabled label={"Example"}
					           value={this.state.episodes[0].file} />
					<div className={"actions"}>
						<TextField onChange={this.setSearchChar} label={"Search"} />
						<TextField onChange={this.setReplaceChar} label={"Replace with"} />
						<Button color={"secondary"} onClick={this.replaceChar}>Replace</Button>
					</div>

				</div>

			</div>;
		}

		let progresion = null;
		if (this.state.percentage) {
			console.log("percent", this.state.percentage, this.state.episodes.length, this.state.percentage as number / this.state.episodes.length * 100);
			progresion = <div className={"progress"}>
				<LinearProgress
					variant="determinate"
					value={this.state.percentage as number / this.state.episodes.length * 100} />
			</div>;

		}


		return (
			<div className={"Renamer"}>
				<SelectFolder onChange={this.onFileSelect} mode={"file"} />
				{options}
				{progresion}

			</div>
		);
	}

	private onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({
			name: e.target.value
		});
	};
	private onFileSelect = (files: string[]) => {
		console.log("files", files);
		if (files.length) {

			const trim = (str: string) => str.replace(/-_/g, " ").replace(".", " . ");

			let fileNames = files.map(trim);

			let numberIndex = this.findNumIndex(fileNames);

			console.log("numberIndex", numberIndex);
			let spited = fileNames.map(file => file.split(" "));
			console.log(fileNames);
			const episodes: Episode[] = fileNames.map((name, index) => ({
				file: files.find(file => trim(file) === name) as string,
				num: Number.parseInt(spited[index][numberIndex]),
				extension: this.findExtension(name) as string
			}));
			console.log(episodes);

			const min = episodes.reduce((ep1, ep2) => ep1.num < ep2.num ? ep1 : ep2).num;
			const max = episodes.reduce((ep1, ep2) => ep1.num > ep2.num ? ep1 : ep2).num;

			this.setState({
				episodes: episodes,
				min,
				max
			});
		}

	};

	private findNumIndex = (filenames: string[]) => {
		console.log("filenames", filenames);
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

	private rename = async (): Promise<any> => {

		if (this.state.min === undefined || this.state.max === undefined) return Promise.reject();

		if (!(this.state.name !== undefined && this.state.name.length > 0)) return Promise.reject();
		this.setState({
			percentage: 0,
			episodes: []
		});
		return Promise.all(this.state.episodes.map((episode: Episode) => {
			return new Promise<void>(async resolve => {
				// @ts-ignore
				const num = this.padWithZeros(episode.num, this.state.max.toString().length);
				await fs.rename(episode.file, `${path.dirname(episode.file)}${path.sep}${this.state.name} ${num}.${episode.extension}`);
				this.setState(prev => ({
					percentage: (prev.percentage ?? 0) + 1
				}), () => resolve());
			});
		}));
	};

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

		if (this.state.replaceOptions.replaceWith && this.state.replaceOptions.search) {

			this.setState({
				percentage: 0
			});

			for (const episode of this.state.episodes) {

				const newFileName = path.basename(episode.file).replace(new RegExp(this.escapeRegex(this.state.replaceOptions.search), "g"), this.state.replaceOptions.replaceWith);
				console.log(JSON.parse(JSON.stringify(this.state)));
				await fs.rename(episode.file, path.join(path.dirname(episode.file), newFileName));
				this.setState(prev => ({
					percentage: (prev.percentage ?? 0) + 1
				}));
			}
		}
	};

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
}

