import React, { Component } from "react";
import "./Titlebar.scss";
import { Button } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RemoveIcon from "@mui/icons-material/Remove";
import SettingsIcon from "@mui/icons-material/Settings";
import * as remote from "@electron/remote";
import Settings from "../settings/Settings";

interface State {
	fullscreen: boolean;
	settingModalOpened: boolean;
}

interface Props {
	title?: string;
}

class Titlebar extends Component<Props, State> {
	override state: State = {
		fullscreen: remote.getCurrentWindow().isFullScreen(),
		settingModalOpened: false,
	};

	override render() {
		const { settingModalOpened } = this.state;
		return (
			<div className={"Titlebar"}>
				<span className={"title"}>{this.props.title || remote.getCurrentWindow().title}</span>
				<div>
					<Button onClick={this.toggleModal}>
						<SettingsIcon htmlColor={"#555555"} fontSize={"small"} />
					</Button>
					<Button onClick={this.minimize}>
						<RemoveIcon />
					</Button>
					<Button onClick={() => this.goFullscreen(!this.state.fullscreen)}>{this.state.fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}</Button>
					<Button className={"close"} onClick={this.close}>
						X
					</Button>
				</div>
				<Settings close={this.toggleModal} isOpen={settingModalOpened} />
			</div>
		);
	}

	private toggleModal = () => {
		this.setState(prev => ({ settingModalOpened: !prev.settingModalOpened }));
	};

	private close(): void {
		if (remote.BrowserWindow.getAllWindows().length > 1) {
			remote.getCurrentWindow().close();
		} else {
			remote.app.quit();
			process.exit(0);
		}
	}

	private minimize(): void {
		remote.getCurrentWindow().minimize();
	}

	private goFullscreen(state: boolean): void {
		remote.getCurrentWindow().setFullScreen(state);
		this.setState({
			fullscreen: state,
		});
	}
}

export default Titlebar;
