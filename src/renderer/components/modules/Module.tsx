import * as React from "react";
import { IconButton, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { ModuleDescription } from "../../store/module/router/reducer";
import "./Module.scss";
import { setPath } from "../../store/module/router/action";
import { StoreState } from "../../store/reducer";
import { createWindowCustomOption } from "../../../main/services/electron/dialogService";
import { getUriParam } from "../../util/url";

type ModuleProps = {
	info: ModuleDescription,
	children: any
}


function Module(props: ModuleProps & { backHistory: Function }) {


	const options = getUriParam<createWindowCustomOption>("options", { json: true }) ?? {
		modal: false
	};

	return <div className={"Module"}>
		{!options.modal && props.info.show.name && <div className="bar">
			<IconButton className={"backBtn"}
			            onClick={() => props.backHistory()}>
				<ArrowBackIcon />
			</IconButton>
			{props.info.show.name && <Typography variant={"h5"} className="title">{props.info.name}</Typography>}
		</div>}

		{props.children}
	</div>;
}


const mapStateToProps = (state: StoreState) => ({
	info: state.routing.routes[state.routing.path]
});

const mapDispatchToProps = (dispatch: Function) => ({
	backHistory: () => dispatch(setPath("/"))
});

export default connect(mapStateToProps, mapDispatchToProps)(Module) as any;

