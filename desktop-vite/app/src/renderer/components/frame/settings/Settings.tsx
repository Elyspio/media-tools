import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Button, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, ListItemText, ListSubheader, Switch, Typography } from "@mui/material";
import React from "react";
import "./Settings.scss";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { Configuration } from "../../../../main/services/configuration/configuration.service";
import { setConfig } from "../../../store/module/configuration/configuration.action";
import { StoreState } from "../../../store";
import { resolve } from "inversify-react";
import { WindowService } from "../../../../main/services/electron/window.service";

type OwnProps = ReduxTypes & {
	isOpen: boolean;
	close: () => void;
};

class Settings extends React.Component<OwnProps> {
	@resolve(WindowService)
	private windowService!: WindowService;

	override render() {
		const { close, isOpen, config } = this.props;
		return (
			<Dialog open={isOpen} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">Settings</DialogTitle>
				<DialogContent className={"Settings"}>
					<Grid container direction={"column"} spacing={2}>
						<Grid item>
							<List subheader={<ListSubheader color={"primary"}>Frame</ListSubheader>}>
								<ListItem>
									<ListItemText primary="Show resource utilization" />
									<ListItemSecondaryAction>
										<Switch edge="end" checked={config.frame.show.resourceUtilization} onChange={(e) => this.toggleResources(e.target.checked)} />
									</ListItemSecondaryAction>
								</ListItem>
							</List>
						</Grid>

						<Grid item>
							<List
								subheader={
									<ListSubheader color={"primary"}>
										<Grid container alignItems={"center"} justifyContent={"space-between"}>
											<Grid item>Resize</Grid>
											<Grid item>
												<Button style={{ marginRight: -16 }} variant={"outlined"} onClick={this.windowService.resetDimensions}>
													<Typography variant={"overline"}>Auto</Typography>
												</Button>
											</Grid>
										</Grid>
									</ListSubheader>
								}
							>
								{Object.keys(config.frame.resize).map((key) => (
									<ListItem key={key}>
										<ListItemText primary={key[0].toUpperCase() + key.slice(1)} />
										<ListItemSecondaryAction>
											<Switch
												edge="end"
												checked={config.frame.resize[key as keyof Configuration["frame"]["resize"]]}
												onChange={(e) => this.toggleResize(key as keyof Configuration["frame"]["resize"], e.target.checked)}
											/>
										</ListItemSecondaryAction>
									</ListItem>
								))}
							</List>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		);
	}

	private toggleResources = (newState: boolean) => {
		this.props.setConfig({
			...this.props.config,
			frame: {
				...this.props.config.frame,
				show: {
					...this.props.config.frame.show,
					resourceUtilization: newState,
				},
			},
		});
	};

	private toggleResize = (dimension: keyof Configuration["frame"]["resize"], state: boolean) => {
		this.props.setConfig({
			...this.props.config,
			frame: {
				...this.props.config.frame,
				resize: {
					...this.props.config.frame.resize,
					[dimension]: state,
				},
			},
		});
	};
}

const mapStateToProps = (state: StoreState) => ({
	config: state.config.current,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setConfig: (config: Configuration) => dispatch(setConfig(config)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export default connector(Settings);
