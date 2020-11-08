import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../../store/reducer";
import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, ListSubheader, Switch } from "@material-ui/core";
import React from "react";
import "./Settings.scss";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Configuration } from "../../../../main/services/configuration/configurationService";
import { setConfig } from "../../../store/module/configuration/action";

type OwnProps = ReduxTypes & {
	isOpen: boolean,
	close: () => void
}

class Settings extends React.Component<OwnProps> {


	toggleResources = (newState: boolean) => {
		this.props.setConfig({
			...this.props.config,
			frame: {
				...this.props.config.frame,
				show: {
					...this.props.config.frame.show,
					resourceUtilization: newState
				}
			}
		});
	};


	render() {
		let { close, isOpen, config } = this.props;
		return <Dialog
			open={isOpen}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Settings</DialogTitle>
			<DialogContent className={"Settings"}>
				<List subheader={<ListSubheader color={"primary"}>Frame</ListSubheader>}>
					<ListItem>
						<ListItemText primary="Show resource utilization" />
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
								defaultChecked={config.frame.show.resourceUtilization}
								onChange={e => this.toggleResources(e.target.checked)}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>;
	}
}


const mapStateToProps = (state: StoreState) => ({
	config: state.config.current
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setConfig: (config: Configuration) => dispatch(setConfig(config))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export default connector(Settings);
