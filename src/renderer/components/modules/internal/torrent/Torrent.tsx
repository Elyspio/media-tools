import React from "react";
import { Services } from "../../../../../main/services";
import { Register } from "../../../../decorators/Module";
import {Grid} from "@material-ui/core";
import  "./Torrent.scss"
import { Button } from "../../../common/Button";
@Register({ name: "Torrent", path: "/torrent" })
class Torrent extends React.Component {

	private stopWatchingFolder?: CallableFunction

	async componentDidMount() {
		let downloadFolder = await Services.system.getDownloadFolder();
		this.stopWatchingFolder = Services.files.watch(downloadFolder, (event, filename) => {
			if(filename.endsWith(".torrent")) {
				this.onTorrentAdded(filename);
			}
		})
	}


	onTorrentAdded = (file: string) => {
		console.log("new torrent", file)
	}

	componentWillUnmount() {
		if(this.stopWatchingFolder)  {
			this.stopWatchingFolder()
		}
	}

	gotoYggTorrent = async () => {
		await Services.system.open("https://yggtorrent.li/")
	}

	render() {
		return <Grid className={"Torrent"}>
			<Button color={"primary"} onClick={this.gotoYggTorrent}>Search torrent</Button>
		</Grid>;
	}
}


