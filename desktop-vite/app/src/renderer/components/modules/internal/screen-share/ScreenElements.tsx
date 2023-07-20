import { useAppDispatch, useAppSelector } from "../../../../store";
import React from "react";
import { setStreamId } from "../../../../store/module/screen-share/screen-share.action";
import { Button, Stack, Typography } from "@mui/material";
import { DesktopCapturerSource } from "electron";

type ScreenElementsProps = {
	elements: DesktopCapturerSource[];
	label: string;
};

/**
 * Display a list of apps or screens with their name and thumbnail
 * @param elements
 * @param label
 * @constructor
 */
export function ScreenElements({ elements, label }: ScreenElementsProps) {
	const dispatch = useAppDispatch();

	const { streamId } = useAppSelector((s) => s.screenShare);

	const handleChange = React.useCallback(
		(id: string) => () => {
			dispatch(setStreamId(id));
		},
		[dispatch],
	);

	return (
		<Stack alignItems={"center"}>
			<Typography>{label}</Typography>
			<Stack direction={"row"} flexWrap={"wrap"} p={2} maxHeight={"26vh"} overflow={"auto"} width={"95%"}>
				{elements.map((src) => (
					<Button
						key={src.id}
						color={streamId === src.id ? "primary" : "inherit"}
						onClick={handleChange(src.id)}
						variant={"outlined"}
						sx={{ textTransform: "none", m: 1 }}
					>
						<Stack direction={"column"} spacing={2} alignItems={"center"} justifyContent={"center"} pb={1}
						       width={200}>
							<Typography noWrap maxWidth={180} fontSize={"smaller"}>
								{src.name}
							</Typography>
							<img src={src.thumbnail.toDataURL()} alt="" width={"100%"} height={100} />
						</Stack>
					</Button>
				))}
			</Stack>
		</Stack>
	);
}
