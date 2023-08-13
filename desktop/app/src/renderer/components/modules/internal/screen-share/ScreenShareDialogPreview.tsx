import { Dialog, DialogTitle } from "@mui/material";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { useAsyncEffect } from "@hooks/useAsyncEffect";
import { sendFrame } from "@modules/screen-share/screen-share.async.actions";

type ScreenShareDialogPreviewProps = {
	open: boolean;
	toggle: () => void;
};

const fps = 60;

export function ScreenShareDialogPreview({ toggle, open }: ScreenShareDialogPreviewProps) {
	const { streamId } = useAppSelector((s) => s.screenShare);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [stream, setStream] = React.useState<MediaStream>();

	const dispatch = useAppDispatch();

	const continuePublish = useRef(true);

	// Create the stream from its id
	useAsyncEffect(async () => {
		console.log({ streamId });
		if (streamId) {
			setStream(
				await navigator.mediaDevices.getUserMedia({
					// audio: {
					// 	mandatory: {
					// 		chromeMediaSource: "desktop",
					// 		chromeMediaSourceId: streamId,
					// 	},
					// },
					video: {
						mandatory: {
							chromeMediaSource: "desktop",
							chromeMediaSourceId: streamId,
						},
					},
				} as any),
			);
		} else {
			setStream(undefined);
		}
	}, [streamId]);

	// Watch the stream once it's been received

	useAsyncEffect(async () => {
		if (!stream || !canvasRef.current) return;

		const videoElement = document.createElement("video");

		videoElement.srcObject = stream;
		await videoElement.play();

		const canvas = canvasRef.current!;

		const context = canvasRef.current!.getContext("2d")!;

		const settings = stream.getVideoTracks()[0].getSettings();

		const publishFrame = () => {
			context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
			const pngDataUrl = canvas.toDataURL("image/png");
			dispatch(sendFrame({ data: pngDataUrl, width: settings.width!, height: settings.height! }));
			if (continuePublish.current) setTimeout(publishFrame, 1000 / fps);
		};

		publishFrame();

		return () => {
			continuePublish.current = false;
		};
	}, [stream, canvasRef.current]);

	return (
		<Dialog open={open} onClose={toggle}>
			<DialogTitle>Stream preview</DialogTitle>
			<canvas style={{ opacity: 0 }} height={1080} width={1920} ref={canvasRef} />
		</Dialog>
	);
}
