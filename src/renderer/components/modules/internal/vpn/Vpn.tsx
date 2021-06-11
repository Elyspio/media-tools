import React, {Component} from "react";
import "./Vpn.scss";
import {Container, Divider, MenuItem, Typography} from "@material-ui/core";
import {Register} from "../../../../decorators/Module";
import {Button} from "../../../common/Button";
import {Services} from "../../../../../main/services";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {StoreState} from "../../../../store";
import {ProviderContext, withSnackbar} from "notistack";
import Box from "@material-ui/core/Box";
import {countries, Country, NordVpnService} from "../../../../../main/services/network/nordvpnService";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";


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
    },
    config: {
        nordvpn: {
            country?: Country
        }
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
        },
        config: {
            nordvpn: {
                country: "Switzerland"
            }
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
            Services.networks.nordvpn.connect(this.state.config.nordvpn.country).catch((e: Error) => {
                console.error(e);
                this.props.enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "right", vertical: "bottom"}});
            });
        },
        disconnect: () => {
            Services.networks.nordvpn.disconnect().catch((e: Error) => {
                console.error(e);
                this.props.enqueueSnackbar(e.message, {variant: "error", anchorOrigin: {horizontal: "right", vertical: "bottom"}});
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
                    <Divider className={"divider"}/>
                    <div className="btns">
                        <Button disabled={this.state.connected.openvpn} color={"primary"} onClick={() => this.openvpn.connect()}>Connect</Button>
                        <Button disabled={!this.state.connected.openvpn} color={"error"} onClick={() => this.openvpn.disconnect()}>Disconnect</Button>
                    </div>
                    <Divider className={"divider"}/>
                    <Typography>{this.props.content}</Typography>
                </Box>

                <Box className={"item"}>
                    <Typography align={"center"}>NordVpn</Typography>
                    <Divider className={"divider"}/>
                    <div className="btns">
                        <Button disabled={this.state.connected.nordvpn} color={"primary"} onClick={() => this.nordvpn.connect()}>Connect</Button>
                        <Button disabled={!this.state.connected.nordvpn} color={"error"} onClick={() => this.nordvpn.disconnect()}>Disconnect</Button>
                    </div>
                    <Divider className={"divider"}/>
                    <Container>
                        <InputLabel id="nordVpnCountryLabel">Country</InputLabel>
                        <Select
                            labelId="nordVpnCountryLabel"
                            id="nordVpnCountryValue"
                            MenuProps={{variant: "selectedMenu"}}
                            value={this.state.config.nordvpn.country}
                            onChange={this.onChange}
                        >
                            {countries.map((name) => (
                                <MenuItem key={name} value={name} className={"exclude"}>
                                    <Typography>{name}</Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    </Container>
                    <Divider className={"divider"}/>
                    <Typography>{this.props.content}</Typography>
                </Box>

            </Container>
        );
    }


    onChange = (e: any) => {
        this.setState(prev => ({
            ...prev,
            config: {
                ...prev.config,
                nordvpn: {
                    ...prev.config.nordvpn,
                    country: e.target.value
                }
            }
        }))
    };

    private actualizeVpnStatus = async () => {
        this.setState({
            connected: {
                nordvpn: await Services.networks.network.isInterfaceConnected(NordVpnService.interface),
                openvpn: false
            }
        });
    };


}




