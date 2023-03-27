import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useModal } from "../../../../hooks/useModal";
import * as remote from "@electron/remote";
import { useInjection } from "inversify-react";
import { TorrentService } from "../../../../../main/services/media/torrent.service";

const { Notification } = remote.require("electron");

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children?: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} children={props.children!} />;
});

function AddNewTorrent(props: { name: string; clear: () => void }) {
	const { open, setClose } = useModal(true);

	const services = {
		torrent: useInjection(TorrentService),
	};

	const launchApp = async (add: boolean) => {
		setClose();
		if (add) {
			await services.torrent.add(props.name);
			new Notification({
				title: `Starting to download ${props.name}`,
			}).show();
			props.clear();
		}
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
			<DialogTitle id="alert-dialog-slide-title">{"Add a new torrent"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">{props.name}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => launchApp(false)} color="primary">
					Do nothing
				</Button>

				<Button onClick={() => launchApp(true)} color="primary">
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddNewTorrent;
