import React, { Component } from "react";
import "./Vpn.scss";
import { Container, Divider, Typography } from "@material-ui/core";
import { Register } from "../../../../decorators/Module";
import { Button } from "../../../common/Button";
import { Services } from "../../../../../main/services";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../../../store";
import { ProviderContext, withSnackbar } from "notistack";


const mapStateToProps = (state: StoreState) => ({
	content: state.vpn.stdio
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


@Register({
	name: "Vpn",
	description: "Start or stop VPN",
	path: "/vpn"
}, connector, withSnackbar)
export class Vpn extends Component<ReduxTypes & ProviderContext> {


	render() {


		return (
			<Container className="Vpn">
				<Typography>Vpn</Typography>
				<Divider />
				<Button color={"warning"} onClick={() => this.connect()}>Connect</Button>
				<Button color={"error"} onClick={() => this.disconnect()}>Disconnect</Button>
				<Divider />
				<Typography>{this.props.content}</Typography>

			</Container>
		);
	}

	connect = () => {
		Services.vpn.nordvpn.connect().catch((e: Error) => {
			this.props.enqueueSnackbar(e.message)
		});
	};

	disconnect = () => {
		Services.vpn.nordvpn.disconnect();
	};


}




