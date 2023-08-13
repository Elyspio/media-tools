import React, { Component } from "react";
import "./Purge.scss";
import { SelectFolder } from "../../../common/os";

import TextField from "@mui/material/TextField";
import { Alert, AlertColor, Button, Container, Input, MenuItem, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { Register } from "@/renderer/decorators/Module";
import { FilesService } from "@services/files/files.service";
import { inject } from "inversify";

interface State {
	match: string;
	folder?: string;
	preview: {
		raw: string[];
		filtered: string[];
		exclude: string[];
		amount: number;
	};
	loading?: boolean;
	alert?: {
		severity: AlertColor;
		message: string;
	};
}

const defaultAmount = 30;
const exclusions = ["node_modules", ".git", ".expo", ".bit"];

@Register({ name: "Purge", description: "Removes files that match a pattern ", path: "/purge" })
export class Purge extends Component<object, State> {
	@inject(FilesService)
	filesService!: FilesService;

	override state: State = {
		match: "",
		folder: undefined,
		preview: {
			raw: [],
			filtered: [],
			exclude: exclusions,
			amount: defaultAmount,
		},

		loading: false,
	};
	private onMatchTimeout?: NodeJS.Timeout;

	private items: HTMLDivElement | null = null;

	override render() {
		const { folder, match, preview, loading, alert } = this.state;

		return (
			<Container className="Purge">
				<SelectFolder onChange={this.onFolderSelect} mode={"folder"} showSelected />
				{loading && <CircularProgress color={"secondary"} size={"2rem"} />}

				{!loading && folder && (
					<>
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

						<Typography className={"preview-title"} variant={"h6"}>
							Preview{" "}
							<span className={"itemCount"}>
								( {preview.filtered.length} / {preview.raw.length} )
							</span>
						</Typography>
						<Container>
							<div onScroll={this.onPreviewScroll} className={"preview-items"}
							     ref={(r) => (this.items = r)}>
								{preview.filtered.slice(0, preview.amount).map((f) => (
									<Typography noWrap key={f}>
										<span title={f}>{f}</span>
									</Typography>
								))}
							</div>
						</Container>
						{match && (
							<div className={"actions"}>
								<Button color={"secondary"} className={"RemoveBtn"} variant={"outlined"}
								        onClick={this.remove}>
									Remove
								</Button>

								{alert && <div>{<Alert severity={alert.severity}>{alert.message}</Alert>}</div>}
							</div>
						)}
					</>
				)}
			</Container>
		);
	}

	private filter = (folders: string[], match: string) => {
		const regExp = new RegExp(match);
		const filtered = folders.filter((f) => f.match(regExp));
		return filtered;
	};

	private onMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const match = e.target.value;

		this.setState((prev) => ({
			...prev,
			match,
		}));

		if (this.onMatchTimeout) clearTimeout(this.onMatchTimeout);

		this.onMatchTimeout = setTimeout(() => {
			this.setState((prev) => ({
				...prev,
				preview: {
					...prev.preview,
					filtered: this.filter(prev.preview.raw, match),
				},
			}));
		}, 50);
	};

	private onFolderSelect = async (folder: string) => {
		this.setState({
			loading: true,
		});

		const folders = await this.filesService.list(folder, ["node_modules", ".git", ".expo", ".bit"]);

		this.setState((prev) => ({
			...prev,
			folder,
			preview: {
				...prev.preview,
				raw: folders,
				filtered: folders,
				amount: defaultAmount,
			},
			loading: false,
		}));
	};

	/**
	 * Remove folders from disk
	 */
	private remove = async () => {
		try {
			const nbNodesToDelete = this.state.preview.filtered.length;

			await this.filesService.deleteNodes(this.state.preview.filtered.map((c) => ({ type: "folder", path: c })));
			await this.onFolderSelect(this.state.folder as string);
			this.setState((prev) => ({
				...prev,
				alert: {
					message: `${nbNodesToDelete} node has been deleted`,
					severity: "success",
				},
			}));
		} catch (e: any) {
			this.setState((prev) => ({
				...prev,
				alert: {
					message: e.message,
					severity: "error",
				},
			}));
		}

		setTimeout(() => {
			this.setState((prev) => ({ ...prev, alert: undefined }));
		}, 50000);
	};
	/**
	 * Handle
	 */
	private onPreviewScroll = () => {
		const element = this.items;

		if (element && element.scrollHeight - element.scrollTop - element.scrollHeight / 10 < element.clientHeight) {
			this.setState((prev) => ({
				...prev,
				preview: {
					...prev.preview,
					amount: prev.preview.amount * 2,
				},
			}));
		}
	};

	private changePreviewExclusion = (e: any) => {
		this.setState((prev) => ({
			...prev,
			preview: {
				...prev.preview,
				exclude: e.target.value,
			},
		}));
	};
}
