import React from "react";
import { Services } from "../../../../../main/services";
import { Register } from "../../../../decorators/Module";

@Register({ name: "Torrent", path: "/torrent" })
class Torrent extends React.Component {

	async componentDidMount() {
		console.log(await Services.media.torrent.login());
		console.log(await Services.media.torrent.search("a"));
	}

	render() {
		return <div>
		</div>;
	}
}


