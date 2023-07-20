import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { Register } from "../../../../../decorators/Module";
import "./Recap.scss";
import Container from "@mui/material/Container";
import OnFinishAction from "../OnFinishAction";
import Typography from "@mui/material/Typography";
import { StoreState } from "../../../../../store";

const mapStateToProps = (state: StoreState) => ({ onFinishAction: state.encoder.onFinishAction });

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export interface Props {}

export interface State {
	timeleft: number;
}

@Register({ name: "Encoder Recap", path: "/encoder/recap", show: { appboard: false, name: true } }, connector)
class Recap extends React.Component<Props & ReduxTypes, State> {
	constructor(props: Props & ReduxTypes) {
		super(props);
		this.state = {
			timeleft: 60,
		};

		const timer = setInterval(() => {
			this.setState(
				(prev) => ({
					...prev,
					timeleft: prev.timeleft - 1,
				}),
				() => {
					if (this.state.timeleft < 1) {
						clearInterval(timer);
					}
				}
			);
		}, 1000);
	}

	override render() {
		return (
			<Container className={"Recap"}>
				<Typography>Time before action: {this.state.timeleft}s</Typography>
				<OnFinishAction close={() => {}} />
			</Container>
		);
	}
}
