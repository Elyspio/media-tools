import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useModal } from "../../../../hooks/useModal";
import * as remote from "@electron/remote";
import { useInjection } from "inversify-react";
import { SystemService } from "../../../../../main/services/system/system.service";
import { ProcessService } from "../../../../../main/services/common/process.service";

const { Notification } = remote.require("electron");

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children?: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} children={props.children ?? <></>} />;
});

function AppNotStarted() {
	const { open, setClose, setOpen } = useModal(false);
	const services = {
		system: useInjection(SystemService),
		process: useInjection(ProcessService),
	};

	React.useEffect(() => {
		services.system.isAppStarted("qbittorrent").then(launched => {
			if (!launched) {
				setOpen();
			}
		});
	}, []);

	const launchApp = () => {
		setClose();
		new Notification({
			title: "Launching qBittorent",
		}).show();
		return services.process.spawnAsync("qbittorrent");
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={close}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={launchApp} color="primary">
					Start
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AppNotStarted;
