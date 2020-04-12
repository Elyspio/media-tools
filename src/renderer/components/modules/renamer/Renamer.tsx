import React from 'react';
import {StoreState} from "../../../store/reducer";
import {connect} from "react-redux";
import {ModuleDescription} from "../../../store/module/components/action";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";

import {promises as fs} from "fs"
import LinearProgress from "@material-ui/core/LinearProgress";
import * as path from "path";

interface StateProps {

}

interface DispatchProps {

}

const mapStateToProps = (state: StoreState) => {
	return {}
};
const mapDispatchToProps = (dispatch: Function) => {
	return {}
};


interface State {
	files: Episode[]
	name?: string,
	min?: number,
	max?: number,
	percentage?: number
}

interface Episode {
	file: File,
	num: number,
	extension: string
}


export class Renamer extends React.Component<{}, State> {

	public static info: ModuleDescription = {
		name: "Renamer",
		description: "toto"
	}

	constructor(props: {}) {
		super(props);
		this.state = {
			files: []
		}
	}

	render() {
		const options = <div className="options">
			<TextField label={"Futur nom"} onChange={this.onNameChange}
			           error={!(this.state.name !== undefined && this.state.name.length > 0)}/>
			<p>Début: {this.state.min}</p>
			<p>Fin: {this.state.max}</p>
			<Button color={"primary"} onClick={() => this.rename()}>
				Rename files
			</Button>
		</div>
		let progresion = null

		if (this.state.percentage) {
			console.log("percent", this.state.percentage, this.state.files.length, this.state.percentage as number / this.state.files.length * 100)
			progresion = <LinearProgress
				variant="determinate"
				value={this.state.percentage as number / this.state.files.length * 100}/>
		}


		return (
			<div>
				<Button>
					<label htmlFor="fileInput">
						Fichiers
					</label>
				</Button>
				<input type={"file"} multiple={true}
				       id={"fileInput"}
				       style={{display: "none"}}
				       onChange={this.onFileSelect}/>

				{this.state.files.length ? options : null}
				{progresion}

			</div>
		);
	}

	private onNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		this.setState({
			name: e.target.value
		})
	}
	private onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files: File[] = [];
		if (e.target.files) {
			for (let i = 0; i < e.target.files.length; i++) {
				files.push(e.target.files[i])
			}

			const trim = (str: string) => str.replace(/-_/g, " ").replace(".", " . ")

			let fileNames = files.map(f => trim(f.name));

			let numberIndex = this.findNumIndex(fileNames);

			console.log("numberIndex", numberIndex);
			let splited = fileNames.map(file => file.split(" "));
			console.log(fileNames);
			const episodes: Episode[] = fileNames.map((name, index) => ({
				file: files.find(file => trim(file.name) === name) as File,
				num: Number.parseInt(splited[index][numberIndex]),
				extension: this.findExtension(name) as string
			}))
			console.log(episodes);

			const min = episodes.reduce((ep1, ep2) => ep1.num < ep2.num ? ep1 : ep2).num
			const max = episodes.reduce((ep1, ep2) => ep1.num > ep2.num ? ep1 : ep2).num

			this.setState({
				files: episodes,
				min,
				max
			})
		}

	}

	private findNumIndex = (filenames: string[]) => {
		console.log("filenames", filenames);
		if (filenames.length === 1) {
			const splited = filenames[0].split(" ");
			let i = 0
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
	}

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

	}

	private rename = async (): Promise<any> => {

		if (!(this.state.name !== undefined && this.state.name.length > 0)) return Promise.reject();

		return Promise.all(this.state.files.map((episode: Episode) => {
			return new Promise(async resolve => {
				await fs.rename(episode.file.path, `${path.dirname(episode.file.path)}${path.sep}${this.state.name} ${episode.num}.${episode.extension}`)
				this.setState(prev => ({
					percentage: (prev.percentage ?? 0) + 1
				}), resolve)
			})
		}))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Renamer);
