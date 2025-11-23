import React, { HTMLAttributes } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "@store";
import { selectFolder } from "@modules/media/media.async.actions";

type Props = Omit<HTMLAttributes<any>, "onChange"> & {
	label?: string;
	showSelected?: boolean;
	color?: ButtonProps["color"];
	variant?: ButtonProps["variant"];
	fullWidth?: boolean;
} & (SelectFile | SelectFolder);

type SelectFile = {
	mode: "file";
	onChange: (item: string[]) => void;
};

type SelectFolder = {
	mode: "folder";
	onChange: (item: string) => void;
};

export function SelectFolder(props: Props) {
	const dispatch = useAppDispatch();

	async function openDialog(e: React.MouseEvent) {
		if (props.mode === "folder") {
			await dispatch(selectFolder()).unwrap();
		}

		e.stopPropagation();
		e.preventDefault();
	}

	const files = useAppSelector((s) => s.media.selected?.files ?? []);

	return (
		<div className={"SelectFolder"} style={{ margin: "1rem 0", width: "100%" }}>
			<Button className={"header"} color={props.color ?? "primary"} fullWidth={props.fullWidth} onClick={openDialog} variant={props.variant ?? "outlined"}>
				{props.mode === "folder" ? <> {props.label ?? "Select folder"}</> : <label htmlFor={"select-file-id"}>Select files</label>}
			</Button>

			{props.showSelected ? (
				<Typography variant={"caption"} className={"files"} noWrap>
					{files}
				</Typography>
			) : null}
		</div>
	);
}
