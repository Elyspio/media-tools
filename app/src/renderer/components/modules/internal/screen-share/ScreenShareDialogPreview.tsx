import { Dialog, DialogTitle } from "@mui/material";
import React, { useRef } from "react";
import { useAppSelector } from "../../../../store";
import { useAsyncEffect } from "../../../../hooks/useAsyncEffect";

type ScreenShareDialogPreviewProps = {
	open: boolean;
	toggle: () => void;
};

export function ScreenShareDialogPreview({ toggle, open }: ScreenShareDialogPreviewProps) {
	const { streamId } = useAppSelector(s => s.screenShare);

	const refVideo = useRef<HTMLVideoElement>(null);

	const [stream, setStream] = React.useState<MediaStream>();

	// Create the stream from its id
	useAsyncEffect(async () => {
		console.log({ streamId });
		if (streamId) {
			setStream(
				await navigator.mediaDevices.getUserMedia({
					audio: {
						mandatory: {
							chromeMediaSource: "desktop",
							chromeMediaSourceId: streamId,
						},
					},
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

	return (
		<Dialog open={open} onClose={toggle}>
			<DialogTitle>Stream preview</DialogTitle>
			<video ref={refVideo}></video>
		</Dialog>
	);
} 