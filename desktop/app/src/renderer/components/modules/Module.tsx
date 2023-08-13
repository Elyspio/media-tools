import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { connect, ConnectedProps } from "react-redux";
import "./Module.scss";
import { setPath } from "@modules/router/router.action";
import { createWindowCustomOption } from "@services/electron/dialog.service";
import { getUriParam } from "../../utils/url";
import { StoreState } from "@store";

function Module(props: ConnectedProps<typeof connector> & { children?: any }) {
	const options = getUriParam<createWindowCustomOption>("options", { json: true }) ?? {
		modal: false,
	};

	return (
		<div className={"Module"}>
			{!options.modal && props.info.show.name && (
				<div className="bar">
					<IconButton className={"backBtn"} onClick={() => props.backHistory()} size="large">
						<ArrowBackIcon />
					</IconButton>
					{props.info.show.name && (
						<Typography variant={"h5"} className="title">
							{props.info.name}
						</Typography>
					)}
				</div>
			)}

			{props.children}
		</div>
	);
}

const mapStateToProps = (state: StoreState) => ({
	info: state.routing.routes[state.routing.path],
});

const mapDispatchToProps = (dispatch: any) => ({
	backHistory: () => dispatch(setPath("/")),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Module);
