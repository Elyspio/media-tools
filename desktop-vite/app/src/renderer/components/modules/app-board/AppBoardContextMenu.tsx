import * as React from "react";
import { DialogContent, DialogTitle, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { setConfig } from "../../../store/module/configuration/configuration.action";
import { useAppDispatch, useAppSelector } from "../../../store";
import { AppBoardShow } from "../../../../config/configuration";

type Props = { close: () => void };

export function AppBoardContextMenu({ close }: Props) {
	const config = useAppSelector((state) => state.config.current);

	const dispatch = useAppDispatch();
	const setShowed = React.useCallback(
		(e: SelectChangeEvent<AppBoardShow[]>) => {
			dispatch(
				setConfig({
					...config,
					appboard: {
						...config.appboard,
						show: e.target.value as AppBoardShow[],
					},
				})
			);
		},
		[dispatch]
	);

	return (
		<>
			<DialogTitle id="responsive-dialog-title">Filter applications</DialogTitle>
			<DialogContent>
				<FormControl variant="outlined" fullWidth>
					<InputLabel id="demo-simple-select-outlined-label">Show</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={config.appboard.show as any}
						onChange={setShowed}
						label="Show"
						multiple={true}
					>
						{Object.values(AppBoardShow).map((l: AppBoardShow) => (
							<MenuItem value={l} key={l}>
								{l}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} color="primary" autoFocus>
					Ok
				</Button>
			</DialogActions>
		</>
	);
}
