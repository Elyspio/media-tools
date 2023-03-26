import { Dialog, DialogTitle } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { useAsyncEffect } from "../../../../hooks/useAsyncEffect";
import { sendFrame } from "../../../../store/module/screen-share/screen-share.async.actions";

type ScreenShareDialogPreviewProps = {
	open: boolean;
	toggle: () => void;
};

const fps = 30;

export function ScreenShareDialogPreview({ toggle, open }: ScreenShareDialogPreviewProps) {
	const { streamId } = useAppSelector(s => s.screenShare);

	const refVideo = useRef<HTMLVideoElement>(null);

	const [stream, setStream] = React.useState<MediaStream>();

	const dispatch = useAppDispatch();

	const intervalR = useRef({ continue: false });

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
				} as any)
			);
		} else {
			setStream(undefined);
		}
	}, [streamId]);

	// Watch the stream once it's been received
	React.useEffect(() => {
		const video = refVideo.current;
		if (video) {
			if (stream) {
				video.srcObject = stream;
				video.onloadedmetadata = () => {
					video?.play();
				};
			} else {
				video.srcObject = null;
			}
		}
	}, [stream, refVideo.current]);

	useEffect(() => {
		if (!refVideo.current) return;

		let canvas = document.createElement("canvas");
		let video = refVideo.current!;

		const publishIframe = () => {
			const ctx = canvas!.getContext("2d")!;
			ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
			const data = canvas!.toDataURL("image/png", 1);
			dispatch(sendFrame({ data, height: video.videoHeight, width: video.videoWidth }));
			if (intervalR.current.continue) setTimeout(publishIframe, 1000 / fps);
		};

		intervalR.current.continue = true;

		let timeout = setTimeout(publishIframe, fps);

		return () => {
			clearTimeout(timeout);
			intervalR.current.continue = false;
		};
	}, [stream, refVideo.current, intervalR.current]);

	return (
		<Dialog open={open} onClose={toggle}>
			<DialogTitle>Stream preview</DialogTitle>
			<video style={{ display: "none" }} ref={refVideo}></video>
		</Dialog>
	);
} 