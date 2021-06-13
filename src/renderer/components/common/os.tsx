import React, {HTMLAttributes} from "react";
import Button, {ButtonProps} from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Services} from "../../../main/services";
import "./os.scss";
import {useLogger} from "../../hooks/useLogger";

type Props = Omit<HTMLAttributes<any>, "onChange"> & {
	showSelected?: boolean,
	color?: ButtonProps["color"],
	variant?: ButtonProps["variant"],
} & (SelectFile | SelectFolder)

type SelectFile = {
	mode: "file";
	onChange: (item: string[]) => void
}

type SelectFolder = {
	mode: "folder";
	onChange: (item: string) => void
}


export function SelectFolder(props: Props) {


	const [files, setFiles] = React.useState<string>("");

	const logger = useLogger();

	async function openDialog() {
		if (props.mode === "folder") {
			let choice = await Services.electron.dialog.selectFolder(false);
			logger.log("files", files);

			if (choice !== null) {
				props.onChange(choice?.folder as string);
			}
			setFiles(choice ? choice.folder : "");
		}
	}

	function onFileChange(e: any) {
		const files = [];
		if (props.mode === "file") {
			for (const f of e.target.files) {
				files.push(f.path);
			}
			props.onChange(files);
			setFiles(files[0]);
		}
	}

	return (
		<div className={"SelectFolder"} style={{margin: "1rem 0"}}>
			<Button className={"header"} color={props.color ?? "primary"} onClick={openDialog} variant={props.variant ?? "outlined"}>
				{
					props.mode === "folder"
						? <> Select folder </>
						: <label htmlFor={"select-file-id"}>Select files</label>
				}
			</Button>

			<input type="file" multiple id={"select-file-id"} hidden={true} onChange={onFileChange}/>

			{props.showSelected && <Typography variant={"caption"} noWrap>{files}</Typography>}

		</div>
	);
}
