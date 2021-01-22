import Frame from "./frame/Frame";
import Router from "./router/Router";
import { checkUpdate } from "../../main/util/updater";
import React from "react";
import { remote } from "electron";
import { Services } from "../../main/services";
import { Configuration } from "../../main/services/configuration/configurationService";
import { StoreState } from "../store/reducer";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

const { BrowserWindow } = remote;


class Application extends React.Component<ReduxTypes> {


	checkHeight = async () => {

		if (this.props.current.autoResize.width || this.props.current.autoResize.height) {
			const config = await Services.configuration.get();
			// @ts-ignore
			const dim: (keyof Configuration["frame"]["resize"])[] = [...Object.keys(config.frame.resize)].filter(k => config.frame.resize[k] && this.props.current.autoResize[k] === true);
			const delta = await Services.electron.window.isUnderSized(dim);
			if (dim.map(d => delta[d]).some(v => v > 0)) {
				await Services.electron.window.resize(delta);
			}
		}


	};

	async componentDidMount() {
		setTimeout(checkUpdate, 1000);
		setInterval(this.checkHeight, 250);
	}

	render() {

		return (
			<Frame>
				<Router />
			</Frame>
		);
	}
}


const mapStateToProps = (state: StoreState) => ({
	current: state.routing.routes[state.routing.path]
});


const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export default connector(Application);
