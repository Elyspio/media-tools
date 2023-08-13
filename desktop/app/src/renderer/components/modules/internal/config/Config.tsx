import React, { useCallback } from "react";
import { register } from "@/renderer/decorators/Module";
import { Box, Divider, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import "./Config.scss";
import { useAppDispatch, useAppSelector } from "@store";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { setConfig } from "@modules/configuration/configuration.async.actions";
import { defaultConfiguration } from "@/config/configuration";


export function Config() {
	const config = useAppSelector(state => state.config.current);

	const dispatch = useAppDispatch();

	const regenerate = useCallback(() => {
		dispatch(setConfig(defaultConfiguration));
	}, [dispatch]);


	return (
		<Stack spacing={2} height={"100%"}>
			<Box maxHeight={"100%"} overflow={"auto"} px={2}>
				<SyntaxHighlighter customStyle={{ background: "inherit", fontSize: "small" }} language={"json5"}
				                   style={a11yDark}>
					{JSON.stringify(config, null, 4)}
				</SyntaxHighlighter>
			</Box>


			<Divider className={"divider"} />
			<Button color={"primary"} onClick={regenerate}>
				Regenerate config
			</Button>
		</Stack>

	);

}

register(Config, {
	name: "Config",
	description: "Changes app config",
	path: "/config",
});