import React, {useCallback, useEffect, useState} from "react";
import {Services} from "../../../../../main/services";
import {register} from "../../../../decorators/Module";
import {Grid} from "@material-ui/core";
import "./Torrent.scss"
import {Button} from "../../../common/Button";
import TorrentList from "./TorrentList";
import AppNotStarted from "./AppNotStarted";
import {useAsyncEffect} from "../../../../hooks/useAsyncEffect";
import AddNewTorrent from "./AddNewTorrent";


let stopWatchingFolder: Function

const Torrent = () => {


	const [addingTorrent, setAddingTorrent] = useState<string>();

	const onTorrentAdded = React.useCallback((filename: string) => {
		setAddingTorrent(filename);
	}, [])


	// region didMount

	useEffect(() => () => stopWatchingFolder && stopWatchingFolder(), [])

	useAsyncEffect(async () => {
		let downloadFolder = await Services.system.getDownloadFolder();
		stopWatchingFolder = Services.files.watch(downloadFolder, (event: any, filename: string) => {
			if (filename.endsWith(".torrent")) {
				onTorrentAdded(filename);
			}
		})
	}, [])

	// endregion didMount


	const gotoYggTorrent = useCallback(() => {
		Services.system.open("https://yggtorrent.li/")
	}, [])

	return <Grid className={"Torrent"}>
		<AppNotStarted/>
		{addingTorrent && <AddNewTorrent name={addingTorrent} clear={() => setAddingTorrent(undefined)}/>}

		<Button color={"primary"} onClick={gotoYggTorrent}>Search torrent</Button>
		<div style={{margin: "1rem"}}/>
		<TorrentList/>
	</Grid>;
}

register(Torrent, {name: "Torrent", path: "/torrent"})


