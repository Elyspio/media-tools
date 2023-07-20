import React, { useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { checkQBittorrentProcess, startQBittorrent } from "../../../../store/module/torrent/torrent.async.actions";
import { useInterval } from "../../../../hooks/useInterval";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children?: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} children={props.children ?? <></>} />;
});

export function AppNotStarted() {
	const dispatch = useAppDispatch();

	const { launched } = useAppSelector((s) => ({
		launched: s.torrent.isQbittorrentStarted,
	}));

	const launchApp = useCallback(() => {
		dispatch(startQBittorrent());
	}, []);

	useInterval(() => dispatch(checkQBittorrentProcess()), 1000, [dispatch]);

	return (
		<Dialog
			open={!launched}
			TransitionComponent={Transition}
			keepMounted
			onClose={close}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">Start QBittorrent ?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">QBittorrent is not started</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={launchApp} color="primary">
					Start
				</Button>
			</DialogActions>
		</Dialog>
	);
}
