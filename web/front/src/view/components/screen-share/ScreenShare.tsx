import React, { useEffect, useRef } from "react";
import { Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import { startScreenShare, stopScreenShare } from "../../../store/module/screen-share/screen-share.async.actions";

type ScreenShareProps = {}

export function ScreenShare({}: ScreenShareProps) {

	const frame = useAppSelector(s => s.screenShare.frame);

	const dispatch = useAppDispatch();


	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		dispatch(startScreenShare());

		return () => {
			dispatch(stopScreenShare());
		};
	}, []);

	useEffect(() => {
		let canvas = canvasRef.current;
		if (canvas && frame) {
			const ctx = canvas.getContext("2d")!;
			const img = new Image();
			img.src = frame.data;
			img.onload = () => {
				canvas!.height = frame.height;
				canvas!.width = frame.width;
				ctx.drawImage(img, 0, 0);
			};
		}
	}, [frame]);


	return (
		<Paper sx={{ width: "100%", height: "100%" }}>
			<Stack p={2} height={"100%"}>
				{frame ?
					<canvas ref={canvasRef} width={"100%"} style={{ aspectRatio: "16/9" }} /> : "Waiting for frames"}

			</Stack>
		</Paper>
	);
}
 