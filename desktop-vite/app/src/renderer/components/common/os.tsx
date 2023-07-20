import React, { HTMLAttributes } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./os.scss";
import { useLogger } from "../../hooks/useLogger";
import { DialogService } from "../../../main/services/electron/dialog.service";
import { useInjection } from "inversify-react";

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
	const services = {
		dialog: useInjection(DialogService),
	};

	const [files, setFiles] = React.useState<string>("");

	const inputRef = React.useRef<HTMLInputElement>(null);

	const logger = useLogger();

	async function openDialog(e: React.MouseEvent) {
		if (props.mode === "folder") {
			const choice = await services.dialog.selectFolder(false);
			logger.info("files", files);

			if (choice !== null) {
				props.onChange(choice?.folder as string);
			}
			setFiles(choice ? choice.folder : "");
		}
		if (props.mode === "file") {
			inputRef.current?.click();
		}

		e.stopPropagation();
		e.preventDefault();
	}

	function onFileChange(e: any) {
		const files = [];
		if (props.mode === "file") {
			for (const f of e.target.files) {
				files.push(f.path);
			}
			e.target.files = null;
			props.onChange(files);
			setFiles(files[0]);
		}
	}

	return (
		<div className={"SelectFolder"} style={{ margin: "1rem 0", width: "100%" }}>
			<Button className={"header"} color={props.color ?? "primary"} fullWidth={props.fullWidth} onClick={openDialog} variant={props.variant ?? "outlined"}>
				{props.mode === "folder" ? <> {props.label ?? "Select folder"}</> : <label htmlFor={"select-file-id"}>Select files</label>}
			</Button>

			<input type="file" multiple id={"select-file-id"} ref={inputRef} hidden={true} onChange={onFileChange} />

			{props.showSelected && (
				<Typography variant={"caption"} className={"files"} noWrap>
					{files}
				</Typography>
			)}
		</div>
	);
}
