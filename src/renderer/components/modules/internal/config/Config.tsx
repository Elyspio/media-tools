import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Register } from "../../../../decorators/Module";
import Container from "@mui/material/Container";
import { TreeItem, TreeView } from "@mui/lab";
import { Add, Adjust, Remove } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import "./Config.scss";

import { StoreState } from "../../../../store";
import { ConfigurationService } from "../../../../../main/services/configuration/configuration.service";
import { DependencyInjectionKeys } from "../../../../../main/services/dependency-injection/dependency-injection.keys";
import { resolve } from "inversify-react";

const mapStateToProps = (state: StoreState) => ({ config: state.config.current });

const mapDispatchToProps = (dispatch: Dispatch) => ({});


type Object = { [key in string]: any }

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

@Register({
	name: "Config",
	description: "Changes app config",
	path: "/config"
}, connector)
export class Config extends Component<ReduxTypes> {

	node = 0;


	@resolve(DependencyInjectionKeys.configuration)
	configurationService!: ConfigurationService;

	override render() {
		const { config } = this.props;
		this.node = 0;
		return (
			<Container className={"Config"}>
				<TreeView
					defaultExpanded={["current"]}
					defaultCollapseIcon={<Remove style={{ color: "red" }} />}
					defaultExpandIcon={<Add style={{ color: "blue" }} />}
					defaultEndIcon={<Adjust />}
				>
					{this.generateTree(config)}
				</TreeView>

				<Divider className={"divider"} />
				<Button color={"primary"} onClick={() => this.configurationService.regenerate()}>Regenerate config</Button>
			</Container>
		);
	}

	private generateTree = (config: Object, key = "current") => {
		const keys = Object.keys(config);
		const items = keys.map(k => {
			const val = config[k];

			if (typeof val === "object") {
				return this.generateTree(val, k);
			}

			let id = (this.node++).toString();
			return <TreeItem key={k + id} nodeId={id} label={`${k} -> ${val}`} />;
		});

		let id = (this.node++).toString();
		return <TreeItem key={key + id} nodeId={id} label={key}>
			{items}
		</TreeItem>;


	};
}

