import React, { Component } from "react";
import "./Light.scss";
import { Register } from "../../../../decorators/Module";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../../../store";

interface State {
	url?: string
}


const mapStateToProps = (state: StoreState) => ({
	url: state.config.current.endpoints.lightManager
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


@Register({ name: "Light", external: true, path: "/light", show: { appboard: true, name: true } }, connector)
export class Light extends Component<ReduxTypes> {


	override async componentDidMount() {

	}

	override render() {
		return <iframe
			className={"Light"}
			src={this.props.url}
			frameBorder="0"
		/>;
	}
}

