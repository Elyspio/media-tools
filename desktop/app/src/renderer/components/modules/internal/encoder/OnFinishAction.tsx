import { store, StoreState } from "../../../../store";
import { DialogContent, DialogTitle, InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { runOnFinishAction, setOnFinishAction } from "../../../../store/module/encoder/encoder.action";
import { onFinishActionList } from "../../../../store/module/encoder/encoder.reducer";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import React from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state: StoreState) => ({
	action: state.encoder.onFinishAction,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

function OnFinishAction(props: { close: () => void } & ReduxTypes) {
	const { close, action } = props;

	const [current, setCurrent] = React.useState<StoreState["encoder"]["onFinishAction"]>(action);

	const validate = () => {
		store.dispatch(setOnFinishAction(current));
		close();
	};

	const values = [...onFinishActionList].sort(s => (s === "None" ? -1 : 1));
	return (
		<div>
			<DialogTitle id="responsive-dialog-title">{"Action when processes are finished"}</DialogTitle>
			<DialogContent>
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="demo-simple-select-outlined-label">Action</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={current}
						onChange={e => setCurrent(e.target.value as any)}
						label="Action"
					>
						{values.map(l => (
							<MenuItem value={l} key={l}>
								{l}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				{process.env.NODE_ENV !== "production" && current !== "None" && (
					<Button variant={"outlined"} onClick={runOnFinishAction}>
						Force action
					</Button>
				)}

				<Button autoFocus onClick={close} color="secondary">
					Cancel
				</Button>
				<Button onClick={validate} color="primary" autoFocus>
					Ok
				</Button>
			</DialogActions>
		</div>
	);
}

export default connector(OnFinishAction);
