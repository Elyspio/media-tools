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
import Box from "@material-ui/core/Box";
import { NordVpnService } from "../../../../../main/services/network/nordvpnService";


const mapStateToProps = (state: StoreState) => ({
	content: state.vpn.stdio
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

type State = {
	connected: {
		openvpn: boolean,
		nordvpn: boolean
	}
}

@Register({
	name: "Vpn",
	description: "Start or stop VPN",
	path: "/vpn"
}, connector, withSnackbar)
export class Vpn extends Component<ReduxTypes & ProviderContext, State> {

	state: State = {
		connected: {
			openvpn: false,
			nordvpn: false
		}
	};

	private openvpn = {
		connect: () => {
			// 	Services.vpn.openvpn.connect().catch((e: Error) => {
			// 		this.props.enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "right", vertical: "bottom"}})
			// 	});
		},
		disconnect: () => {
			// Services.vpn.openvpn.disconnect().catch((e: Error) => {
			// 	this.props.enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "right", vertical: "bottom"}})
			// })
		}
	};
	private nordvpn = {
		connect: () => {
			Services.networks.nordvpn.connect("P2P").catch((e: Error) => {
				console.error(e);
				this.props.enqueueSnackbar(e.message, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "bottom" } });
			});
		},
		disconnect: () => {
			Services.networks.nordvpn.disconnect().catch((e: Error) => {
				console.error(e);
				this.props.enqueueSnackbar(e.message, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "bottom" } });
			});
		}
	};

	async componentDidMount() {
		setInterval(() => this.actualizeVpnStatus(), 1000);
		await this.actualizeVpnStatus();
	}

	render() {


		return (
			<Container className="Vpn">
				<Box className={"item"}>
					<Typography align={"center"}>OpenVpn</Typography>
					<Divider className={"divider"} />
					<div className="btns">
						<Button disabled={this.state.connected.openvpn} color={"primary"} onClick={() => this.openvpn.connect()}>Connect</Button>
						<Button disabled={!this.state.connected.openvpn} color={"error"} onClick={() => this.openvpn.disconnect()}>Disconnect</Button>
					</div>
					<Divider className={"divider"} />
					<Typography>{this.props.content}</Typography>
				</Box>

				<Box className={"item"}>
					<Typography align={"center"}>NordVpn</Typography>
					<Divider className={"divider"} />
					<div className="btns">
						<Button disabled={this.state.connected.nordvpn} color={"primary"} onClick={() => this.nordvpn.connect()}>Connect</Button>
						<Button disabled={!this.state.connected.nordvpn} color={"error"} onClick={() => this.nordvpn.disconnect()}>Disconnect</Button>
					</div>
					<Divider className={"divider"} />
					<Typography>{this.props.content}</Typography>
				</Box>

			</Container>
		);
	}

	private actualizeVpnStatus = async () => {
		this.setState({
			connected: {
				nordvpn: await Services.networks.network.isInterfaceConnected(NordVpnService.interface),
				openvpn: false
			}
		});
	};


}




