import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, ListSubheader, Switch} from "@material-ui/core";
import React from "react";
import "./Settings.scss";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {Configuration} from "../../../../main/services/configuration/configurationService";
import {setConfig} from "../../../store/module/configuration/action";
import {StoreState} from "../../../store";

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


	toggleResize = (dimension: keyof Configuration["frame"]["resize"], state: boolean) => {
		this.props.setConfig({
			...this.props.config,
			frame: {
				...this.props.config.frame,
				resize: {
					...this.props.config.frame.resize,
					[dimension]: state
				}
			}
		});
	};

	override render() {
		let {close, isOpen, config} = this.props;
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
						<ListItemText primary="Show resource utilization"/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								checked={config.frame.show.resourceUtilization}
								onChange={e => this.toggleResources(e.target.checked)}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<List subheader={<ListSubheader color={"primary"}>Resize</ListSubheader>}>

					{Object.keys(config.frame.resize).map((key) => (
						<ListItem key={key}>
							<ListItemText primary={key[0].toUpperCase() + key.slice(1)}/>
							<ListItemSecondaryAction>
								<Switch
									edge="end"
									checked={config.frame.resize[key as keyof Configuration["frame"]["resize"]]}
									onChange={e => this.toggleResize(key as keyof Configuration["frame"]["resize"], e.target.checked)}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					))}
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
