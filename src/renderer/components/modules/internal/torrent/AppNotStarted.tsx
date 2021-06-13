import React from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@material-ui/core";
import {TransitionProps} from "@material-ui/core/transitions";
import {Button} from "../../../common/Button";
import {Services} from '../../../../../main/services';
import {useModal} from "../../../../hooks/useModal";
import {remote} from "electron"
import {spawnAsync} from "../../../../../main/util";

const {Notification} = remote.require('electron')


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});


function AppNotStarted() {

	const {open, setClose, setOpen} = useModal(false)


	React.useEffect(() => {
		Services.system.isAppStarted("qbittorrent").then(launched => {
			if (!launched) {
				setOpen()
			}
		})
	}, [])


	const launchApp = () => {
		setClose()
		new Notification({
			title: "Launching qBittorent",
		}).show()
		return spawnAsync("qbittorrent")
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
					Let Google help apps determine location. This means sending anonymous location data to
					Google, even when no apps are running.
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