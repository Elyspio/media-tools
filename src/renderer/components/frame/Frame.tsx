import React, {Component} from 'react';
import './Frame.scss'
import {Paper} from "@material-ui/core";
import Titlebar from "./titlebar/Titlebar";

class Frame extends Component {
	render() {
		return (
			<Paper square className={"Frame"}>
				<Titlebar/>
				<div className="main">
					{this.props.children}
				</div>
			</Paper>
		);
	}
}

export default Frame;
