import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {Button} from "../../../common/Button";
import {useModal} from "../../../../hooks/useModal";
import {remote} from "electron"
import {Services} from "../../../../../main/services";

const {Notification} = remote.require('electron')


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});


function AddNewTorrent(props: { name: string, clear: () => void }) {

	const {open, setClose, setOpen} = useModal(true)


	const launchApp = async (add: boolean) => {
		setClose()
		if (add) {
			await Services.media.torrent.add(props.name)
			new Notification({
				title: `Starting to download ${props.name}`,
			}).show()
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
				<DialogContentText id="alert-dialog-slide-description">
					{props.name}
				</DialogContentText>
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
