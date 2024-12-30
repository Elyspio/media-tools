import { Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, ListSubheader, Stack, Switch, Typography } from "@mui/material";
import React, { useCallback } from "react";
import "./Settings.scss";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { Configuration } from "@services/configuration/configuration.service";
import { resetDimensions, setConfig } from "@modules/configuration/configuration.async.actions";
import { useAppDispatch, useAppSelector } from "@store";

type OwnProps = {
	isOpen: boolean;
	close: () => void;
};

export const Settings: React.FC<OwnProps> = ({ close, isOpen }) => {
	const config = useAppSelector((state) => state.config.current);
	const dispatch = useAppDispatch();

	const toggleResources = useCallback(
		(newState: boolean) => {
			dispatch(
				setConfig({
					...config,
					frame: {
						...config.frame,
						show: {
							...config.frame.show,
							resourceUtilization: newState,
						},
					},
				}),
			);
		},
		[config, dispatch],
	);

	const toggleResize = useCallback(
		(dimension: keyof Configuration["frame"]["resize"], state: boolean) => {
			dispatch(
				setConfig({
					...config,
					frame: {
						...config.frame,
						resize: {
							...config.frame.resize,
							[dimension]: state,
						},
					},
				}),
			);
		},
		[config, dispatch],
	);

	return (
		<Dialog open={isOpen} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Settings</DialogTitle>
			<DialogContent className={"Settings"}>
				<Stack direction="column" spacing={2}>
					<Stack direction="column" spacing={2}>
						<List subheader={<ListSubheader color={"primary"}>Frame</ListSubheader>}>
							<ListItem>
								<ListItemText primary="Show resource utilization" />
								<ListItemSecondaryAction>
									<Switch edge="end" checked={config.frame.show.resourceUtilization} onChange={(e) => toggleResources(e.target.checked)} />
								</ListItemSecondaryAction>
							</ListItem>
						</List>

						<List
							subheader={
								<ListSubheader color={"primary"}>
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<Typography>Resize</Typography>
										<Button style={{ marginRight: -16 }} variant={"outlined"} onClick={() => dispatch(resetDimensions())}>
											<Typography variant={"overline"}>Auto</Typography>
										</Button>
									</Stack>
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
											onChange={(e) => toggleResize(key as keyof Configuration["frame"]["resize"], e.target.checked)}
										/>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</Stack>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default Settings;
