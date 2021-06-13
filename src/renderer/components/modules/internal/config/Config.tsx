import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {Register} from "../../../../decorators/Module";
import Container from "@material-ui/core/Container";
import {TreeItem, TreeView} from "@material-ui/lab";
import {Add, Adjust, Remove} from "@material-ui/icons";
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import "./Config.scss";
import {Services} from "../../../../../main/services";
import {StoreState} from "../../../../store";

const mapStateToProps = (state: StoreState) => ({config: state.config.current});

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

	override render() {
		const {config} = this.props;
		this.node = 0;
		return (
			<Container className={"Config"}>
				<TreeView
					defaultExpanded={["current"]}
					defaultCollapseIcon={<Remove style={{color: "red"}}/>}
					defaultExpandIcon={<Add style={{color: "blue"}}/>}
					defaultEndIcon={<Adjust/>}
				>
					{this.generateTree(config)}
				</TreeView>

				<Divider className={"divider"}/>
				<Button color={"primary"} onClick={() => Services.configuration.regenerate()}>Regenerate config</Button>
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
			return <TreeItem key={k + id} nodeId={id} label={`${k} -> ${val}`}/>;
		});

		let id = (this.node++).toString();
		return <TreeItem key={key + id} nodeId={id} label={key}>
			{items}
		</TreeItem>;


	};
}

