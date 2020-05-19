import React, {Component} from 'react';
import {ModuleDescription} from "../../../store/module/components/action";
import "./Light.scss"

interface State {
	url?: string
}

export class Light extends Component<{}, State> {

	public static info: ModuleDescription = {
		name: "Lights",
		description: "toto"
	}

	state = {
		url: undefined
	};

	private fetchTimeout(url: string, timeout: number) {
		return Promise.race([
			fetch(url),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('timeout')), timeout)
			)
		]);
	}

	async componentDidMount() {
		try {
			await this.fetchTimeout("http://aero.elyspio.fr", 100);
			this.setState({
				url: "http://aero.elyspio.fr"
			})
		} catch (e) {
			this.setState({
				url: "http://pi.elyspio.fr"
			})
		}
	}

	render() {
		if (this.state.url) {
			return <iframe className={"Light"}
			               src={this.state.url}
			               frameBorder="0"/>
		}
		return null;
	}
}

