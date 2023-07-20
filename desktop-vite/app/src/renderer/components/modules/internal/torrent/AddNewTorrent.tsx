import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useModal } from "../../../../hooks/useModal";
import { setAddingTorrent } from "../../../../store/module/torrent/torrent.action";
import { useAppDispatch } from "../../../../store";
import { downloadTorrent } from "../../../../store/module/torrent/torrent.async.actions";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children?: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} children={props.children!} />;
});

export function AddNewTorrent(props: { name: string }) {
	const dispatch = useAppDispatch();

	const { open, setClose } = useModal(true);

	const launchApp = useCallback(async (add: boolean) => {
		setClose();
		dispatch(setAddingTorrent(undefined));
		if (add) {
			dispatch(downloadTorrent());
		}
	}, []);

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={close}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">Add a new torrent</DialogTitle>
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
