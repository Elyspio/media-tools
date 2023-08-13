import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Register } from "@/renderer/decorators/Module";
import Container from "@mui/material/Container";
import { TreeItem, TreeView } from "@mui/lab";
import { Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import "./Config.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { StoreState } from "@store";
import { ConfigurationService } from "@services/configuration/configuration.service";
import { inject } from "inversify";

const mapStateToProps = (state: StoreState) => ({ config: state.config.current });

const connector = connect(mapStateToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

@Register(
	{
		name: "Config",
		description: "Changes app config",
		path: "/config",
	},
	connector,
)
export class Config extends Component<ReduxTypes> {
	node = 0;

	@inject(ConfigurationService)
	configurationService!: ConfigurationService;

	override render() {
		const { config } = this.props;
		this.node = 0;
		return (
			<Container className={"Config"}>
				<TreeView
					defaultExpanded={["current"]}
					defaultCollapseIcon={<ExpandMoreIcon />}
					defaultExpandIcon={<ChevronRightIcon />}
					// defaultCollapseIcon={<Remove style={{ color: "red" }} />}
					// defaultExpandIcon={<Add style={{ color: "blue" }} />}
					// defaultEndIcon={<Adjust />}
				>
					{this.generateTree(config)}
				</TreeView>

				<Divider className={"divider"} />
				<Button color={"primary"} onClick={() => this.configurationService.regenerate()}>
					Regenerate config
				</Button>
			</Container>
		);
	}

	private generateTree = (config: object, key = "current") => {
		const keys = Object.keys(config);
		const items = keys.map((k) => {
			// @ts-ignore
			const val = config[k];

			if (typeof val === "object") {
				return this.generateTree(val, k);
			}

			const id = (this.node++).toString();
			return (
				<TreeItem
					key={k + id}
					nodeId={id}
					label={
						<Grid container alignItems={"center"}>
							{k} <ArrowForwardIcon fontSize={"small"} opacity={0.5} /> {val.toString()}
						</Grid>
					}
				/>
			);
		});

		const id = (this.node++).toString();
		return (
			<TreeItem key={key + id} nodeId={id} label={key}>
				{items}
			</TreeItem>
		);
	};
}
