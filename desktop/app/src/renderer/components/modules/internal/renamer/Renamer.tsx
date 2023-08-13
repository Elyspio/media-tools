import "./Renamer.scss";
import { register } from "@/renderer/decorators/Module";
import { SelectFolder } from "../../../common/os";
import React, { useCallback, useEffect, useMemo } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { StoreState, useAppDispatch, useAppSelector } from "@store";
import { RenamerField, setRenamerField } from "@modules/renamer/renamer.action";
import { createSelector } from "reselect";
import {
	refreshRenamerExample,
	runRename,
	runReplaceChars,
	setRenamerFiles,
} from "@modules/renamer/renamer.async.actions";

const renamerSelector = createSelector([(s: StoreState) => s.renamer], (renamer) => ({
	...renamer,
	canReplaceChars: (renamer.replaceOptions.search?.length ?? 0) > 0,
	newNameError: !(renamer.newName !== undefined && renamer.newName.length > 0),
}));

const RenamerComponent = () => {
	const { example, newName, min, max, newNameError, files, canReplaceChars } = useAppSelector(renamerSelector);

	const dispatch = useAppDispatch();

	const updateField = useCallback(
		(field: RenamerField) => (e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(
				setRenamerField({
					field: field,
					val: e.target.value,
				}),
			);
		},
		[dispatch],
	);

	const rename = useCallback(() => {
		dispatch(runRename());
	}, [dispatch]);

	const replaceChars = useCallback(() => {
		dispatch(runReplaceChars());
	}, [dispatch]);

	const selectFiles = useCallback(
		(files: string[]) => {
			dispatch(setRenamerFiles(files));
		},
		[dispatch],
	);

	useEffect(() => {
		dispatch(refreshRenamerExample());
	}, [dispatch, newName, files]);

	const options = useMemo(
		() =>
			files.length && (
				<Stack spacing={1.5}>
					<Stack spacing={1}>
						<TextField id={"renamer-new-name-input"} label={"Futur nom"} onChange={updateField("newName")}
						           fullWidth error={newNameError} />

						<Stack>
							<Typography variant={"overline"}>Début: {min}</Typography>
							<Typography variant={"overline"}>Fin: {max}</Typography>
						</Stack>
					</Stack>

					{example && (
						<Stack spacing={1}>
							<TextField className={"line"} disabled label={"Origin"} value={example.before} />
							<TextField className={"line"} disabled label={"Renamed"} value={example.after} />
						</Stack>
					)}

					<Button color={"secondary"} onClick={rename} disabled={newName.length === 0}>
						Rename files
					</Button>

					<Stack direction={"row"} spacing={1}>
						<TextField onChange={updateField("search")} label={"Search"} />
						<TextField onChange={updateField("replaceWith")} label={"Replace with"} />
						<Button variant={"outlined"} color={"secondary"} onClick={replaceChars} disabled={!canReplaceChars}>
							Replace char
						</Button>
					</Stack>
				</Stack>
			),
		[canReplaceChars, example, files.length, max, min, newName.length, newNameError, rename, replaceChars, updateField],
	);

	return (
		<div className={"Renamer"}>
			<SelectFolder onChange={selectFiles} mode={"file"} />
			{options}
		</div>
	);
};

export const Renamer = register(RenamerComponent, { name: "Renamer", path: "/renamer" });
