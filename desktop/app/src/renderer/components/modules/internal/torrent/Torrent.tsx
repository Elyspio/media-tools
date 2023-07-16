import React, { useCallback, useEffect } from "react";

import { register } from "../../../../decorators/Module";
import { Button, Grid } from "@mui/material";
import "./Torrent.scss";
import TorrentList from "./list/TorrentList";
import { AppNotStarted } from "./AppNotStarted";
import { AddNewTorrent } from "./AddNewTorrent";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
	openTorrentBrowser,
	stopWatchNewTorrents,
	watchNewTorrents,
} from "../../../../store/module/torrent/torrent.async.actions";


const Torrent = () => {

	const dispatch = useAppDispatch();

	const { addingTorrent } = useAppSelector(s => ({ addingTorrent: s.torrent.adding }));

	useEffect(() => {
		dispatch(watchNewTorrents());
		return () => {
			dispatch(stopWatchNewTorrents());
		};
	}, [dispatch]);

	const gotoYggTorrent = useCallback(() => {
		dispatch(openTorrentBrowser());
	}, []);

	return (
		<Grid className={"Torrent"}>
			<AppNotStarted />
			{addingTorrent && <AddNewTorrent name={addingTorrent} />}

			<Button color={"primary"} onClick={gotoYggTorrent}>
				Search torrent
			</Button>
			<div style={{ margin: "1rem" }} />
			<TorrentList />
		</Grid>
	);
};

register(Torrent, { name: "Torrent", path: "/torrent" });
