import React from "react";
import "./Updater.scss";
import { Register } from "../../../../decorators/Module";
import { CircularProgressWithLabel } from "../../../common/progress";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Button from "@mui/material/Button";
import { checkUpdate, downloadUpdate, getVersion, installUpdate } from "../../../../../main/util/updater";
import { Grid, Typography } from "@mui/material";
import { setServerUrl } from "../../../../store/module/updater/action";
import { StoreState } from "../../../../store";

const mapStateToProps = (state: StoreState) => ({
	progress: state.updater.download,
	serverVersion: state.updater.serverVersion,
	serverUrl: state.updater.serverUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	setServerUrl: (url: string) => dispatch(setServerUrl(url)),
});

type State = {
	serverUrl: string;
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

@Register({ name: "Updater", path: "/updater", description: "Check for update and apply it" }, connector)
class Updater extends React.Component<ReduxTypes, State> {
	override render() {
		const { progress, serverVersion } = this.props;

		const size = {
			circle: "15rem",
			title: "1.3rem",
			percentage: "1.7rem",
		};

		return (
			<Grid className={"Updater"} container direction={"column"} justifyContent={"space-between"}>
				<Grid container direction={"column"} className={"text"} justifyContent={"space-evenly"} alignItems={"center"}>
					<Grid item className={"info"}>
						<Typography variant={"h6"} component={"p"} className={"version-title-app"}>
							Server
						</Typography>
						<div>
							<Typography className={"input"}>
								<span className="label">Version:</span>
								<span className="content">{serverVersion}</span>
							</Typography>
						</div>

						<Typography variant={"h6"} component={"p"} className={"version-title-server"}>
							App
						</Typography>
						<div>
							<Typography className={"input"}>
								<span className="label">Version:</span>
								<span className="content">{getVersion()}</span>
							</Typography>
						</div>
					</Grid>
					<Grid item className="buttons" container direction={"column"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
						<Grid item>
							<Button fullWidth color={"primary"} onClick={checkUpdate} variant={"outlined"}>
								Check for update
							</Button>
						</Grid>
						<Grid item>
							<Button fullWidth color={"secondary"} onClick={downloadUpdate} variant={"outlined"}>
								Force Download
							</Button>
						</Grid>
						<Grid item>
							<Button fullWidth color={"primary"} onClick={installUpdate} variant={"contained"} disabled={progress !== 100}>
								Install
							</Button>
						</Grid>
					</Grid>
				</Grid>

				<Grid item className={"main"} container justifyContent={"center"} alignItems={"center"}>
					<Grid item className="progress">
						{progress && <CircularProgressWithLabel size={size} label={(progress || 0) < 100 ? "Downloading" : "Downloaded"} value={progress ?? 0} />}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}
