import React, { ReactNode } from "react";
import "./Frame.scss";
import { Paper } from "@material-ui/core";
import Titlebar from "./titlebar/Titlebar";
import ResourceUtilization from "./resource-utilization/ResourceUtilization";
import { getUriParam } from "../../util/url";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { StoreState } from "../../store/reducer";

type Props = ReduxTypes & {
	children: ReactNode
}

function Frame(props: Props) {

	const options = getUriParam("options", { json: true }) ?? {
		bottom: props.config.current.frame.show.resourceUtilization,
		top: true
	};

	const main = <div className="main">
		{props.children}
	</div>;
	return (
		<Paper square className={"Frame"}>
			{options.top && <Titlebar title={options.title} />}
			{main}
			{options.bottom && <ResourceUtilization />}
		</Paper>
	);
}


const mapStateToProps = (state: StoreState) => ({
	config: state.config
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;


export default connector(Frame);
