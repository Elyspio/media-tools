import React, { Component } from "react";
import "./Purge.scss";
import { SelectFolder } from "../../../common/os";
import { Services } from "../../../../../main/services";
import TextField from "@material-ui/core/TextField";
import { Button, Container, Input, MenuItem, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import { Alert, Color } from "@material-ui/lab";
import { Register } from "../../../../decorators/Module";

interface State {
	match: string,
	folder?: string
	preview: {
		raw: string[],
		filtered: string[],
		exclude: string[],
		amount: number
	}
	loading?: boolean,
	alert?: {
		severity: Color,
		message: string
	}
}


const defaultAmount = 30;
let exclusions = ["node_modules", ".git", ".expo", ".bit"];

@Register({ name: "Purge", description: "Removes files that match a pattern ", path: "/purge" })
export class Purge extends Component<{}, State> {

	override state: State = {
		match: "",
		folder: undefined,
		preview: {
			raw: [],
			filtered: [],
			exclude: exclusions,
			amount: defaultAmount
		},

		loading: false
	};
	private onMatchTimeout?: NodeJS.Timeout;

	private items: HTMLDivElement | null = null;

	override render() {

		let { folder, match, preview, loading, alert } = this.state;

		return (
			<Container className="Purge">
				<SelectFolder onChange={this.onFolderSelect} mode={"folder"} showSelected />
				{loading && <CircularProgress color={"secondary"} size={"2rem"} />}

				{!loading && folder && <>

					<Box className="filter">
						<TextField label={"Match"} onChange={this.onMatchChange} />

						<Box className={"exclusion"}>
							<InputLabel id="ignoreContentLabel">Ignore content from</InputLabel>
							<Select
								labelId="ignoreContentLabel"
								id="ignoreContentSelect"
								multiple
								MenuProps={{ variant: "menu" }}
								value={preview.exclude}
								renderValue={(selected: any) => selected.join(", ")}
								input={<Input />}
								onChange={this.changePreviewExclusion}
							>
								{exclusions.map((name) => (
									<MenuItem key={name} value={name} className={"exclude"}>
										<Checkbox checked={preview.exclude.includes(name)} color={"secondary"} />
										<Typography className={"item"}>{name}</Typography>
									</MenuItem>
								))}
							</Select>
						</Box>
					</Box>


					<Typography className={"preview-title"} variant={"h6"}>Preview <span className={"itemCount"}>( {preview.filtered.length} / {preview.raw.length} )</span>
					</Typography>
					<Container>
						<div onScroll={this.onPreviewScroll} className={"preview-items"} ref={r => this.items = r}>
							{preview.filtered.slice(0, preview.amount).map(f => <Typography noWrap key={f}><span title={f}>{f}</span></Typography>)}
						</div>
					</Container>
					{match && <div className={"actions"}>
						<Button color={"secondary"} className={"RemoveBtn"} variant={"outlined"} onClick={this.remove}>Remove</Button>

						{alert && <div>
							{<Alert severity={alert.severity}>{alert.message}</Alert>}
						</div>}

					</div>}
				</>}


			</Container>
		);
	}

	private filter = (folders: string[], match: string) => {

		let regExp = new RegExp(match);
		console.time("filter");
		let filtered = folders.filter((f) => f.match(regExp));
		console.timeEnd("filter");
		return filtered;
	};

	private onMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("c");
		let match = e.target.value;

		this.setState(prev => ({
			...prev,
			match
		}));


		if (this.onMatchTimeout) clearTimeout(this.onMatchTimeout);

		this.onMatchTimeout = setTimeout(() => {
			this.setState(prev => ({
				...prev,
				preview: {
					...prev.preview,
					filtered: this.filter(prev.preview.raw, match)
				}
			}));
		}, 50);
	};

	private onFolderSelect = async (folder: string) => {
		console.time("folders");
		this.setState({
			loading: true
		});

		const folders = await Services.files.list(folder, ["node_modules", ".git", ".expo", ".bit"]);
		console.timeEnd("folders");

		this.setState(prev => ({
			...prev,
			folder,
			preview: {
				...prev.preview,
				raw: folders,
				filtered: folders,
				amount: defaultAmount
			},
			loading: false
		}));
	};

	/**
	 * Remove folders from disk
	 */
	private remove = async () => {
		try {

			const nbNodesToDelete = this.state.preview.filtered.length;

			await Services.files.deleteNodes(this.state.preview.filtered.map(c => ({ type: "folder", path: c })));
			await this.onFolderSelect(this.state.folder as string);
			this.setState(prev => ({
				...prev,
				alert: {
					message: `${nbNodesToDelete} node has been deleted`,
					severity: "success"
				}
			}));
		} catch (e) {
			this.setState(prev => ({
				...prev,
				alert: {
					message: e.message,
					severity: "error"
				}
			}));
		}


		setTimeout(() => {
			this.setState(prev => ({ ...prev, alert: undefined }));
		}, 50000);


	};
	/**
	 * Handle
	 */
	private onPreviewScroll = () => {
		const element = this.items;

		if (element && element.scrollHeight - element.scrollTop - element.scrollHeight / 10 < element.clientHeight) {
			this.setState(prev => ({
				...prev,
				preview: {
					...prev.preview,
					amount: prev.preview.amount * 2
				}
			}));
		}
	};

	private changePreviewExclusion = (e: any) => {
		this.setState(prev => ({
			...prev,
			preview: {
				...prev.preview,
				exclude: e.target.value
			}
		}));
	};
}

