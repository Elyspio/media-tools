import React from "react";
import "./Updater.scss";
import { Register } from "../../../../decorators/Module";
import { CircularProgressWithLabel } from "../../../common/progress";
import { StoreState } from "../../../../store/reducer";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import Button from "@material-ui/core/Button";
import { checkUpdate, downloadUpdate, getVersion, installUpdate } from "../../../../../main/util/updater";
import { Typography } from "@material-ui/core";

interface State {

}

const mapStateToProps = (state: StoreState) => ({
	progress: state.updater.download,
	serverVersion: state.updater.serverVersion
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

@Register({ name: "Updater", path: "/updater" }, connector)
class Updater extends React.Component<ReduxTypes> {

	render() {

		const { progress, serverVersion } = this.props;

		const size = {
			circle: "15rem",
			title: "1.3rem",
			percentage: "1.7rem"
		};

		return (
			<div className={"Updater"}>

				<div className={"info"}>
					<Typography variant={"h5"} component={"p"} className={"version-title"}>Versions</Typography>
					<div>
						<Typography><span className="label">App:</span> {getVersion()}</Typography>
						<Typography><span className="label">Server:</span> {serverVersion}</Typography>
					</div>
				</div>


				<div className="main">
					<div className="progress">
						<CircularProgressWithLabel size={size} label={(progress || 0) < 100 ? "Downloading" : "Downloaded"} value={progress || 0} />
					</div>


					<div className="buttons">
						<Button color={"primary"} onClick={checkUpdate} variant={"outlined"}>Check for update</Button>
						<Button color={"secondary"} onClick={downloadUpdate} variant={"outlined"}>Force Download</Button>
						<Button color={"primary"} onClick={installUpdate} variant={"contained"} disabled={progress !== 100}>Install</Button>

					</div>
				</div>


			</div>
		);
	}
}

