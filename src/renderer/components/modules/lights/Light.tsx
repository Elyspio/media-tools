import React, {Component} from 'react';
import {ModuleDescription} from "../../../store/module/components/action";
import "./Light.scss"
export class Light extends Component {

	public static info: ModuleDescription = {
		name: "Lights",
		description: "toto"
	}

	render() {
		return (
				<iframe className={"Light"} src="http://localhost:3000/?theme=dark" frameBorder="0"/>
		);
	}
}

