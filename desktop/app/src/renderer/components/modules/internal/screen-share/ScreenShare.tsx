import React from "react";
import { register } from "@/renderer/decorators/Module";
import { desktopCapturer } from "@electron/remote";
import { DesktopCapturerSource } from "electron";
import { Button, Stack } from "@mui/material";
import { useModal } from "@hooks/useModal";
import { useAppDispatch, useAppSelector } from "@store";
import { setStreamId } from "@modules/screen-share/screen-share.action";
import { ScreenElements } from "./ScreenElements";
import { ScreenShareDialogPreview } from "./ScreenShareDialogPreview";
import { startScreenShare, stopScreenShare } from "@modules/screen-share/screen-share.async.actions";

function ScreenShare() {
	const dispatch = useAppDispatch();

	const { streamId } = useAppSelector((s) => s.screenShare);

	const [screens, setScreens] = React.useState<DesktopCapturerSource[]>([]);
	const [windows, setWindows] = React.useState<DesktopCapturerSource[]>([]);

	const { open, toggle } = useModal(false);

	// Get all available apps and screens
	const getAvailableStreamInfos = React.useCallback(() => {
		return desktopCapturer.getSources({ types: ["window", "screen"] }).then(async (sources) => {
			setScreens(sources.filter((src) => src.name.startsWith("Screen")));
			setWindows(sources.filter((src) => !src.name.startsWith("Screen")));
		});
	}, []);

	const stopRecording = React.useCallback(() => {
		dispatch(setStreamId());
		dispatch(stopScreenShare());
	}, [dispatch]);

	React.useEffect(() => {
		getAvailableStreamInfos();
		dispatch(startScreenShare());

		return stopRecording;
	}, [dispatch, getAvailableStreamInfos, stopRecording]);

	return (
		<Stack spacing={1}>
			<Stack direction={"row"} spacing={1} m={2}>
				<Button onClick={getAvailableStreamInfos} color={"warning"}>
					Refresh
				</Button>

				{streamId && (
					<>
						<Button onClick={toggle}>Preview</Button>
						<Button onClick={stopRecording} color={"error"}>
							Stop
						</Button>
					</>
				)}
			</Stack>
			<Stack direction={"column"} spacing={2} m={2}>
				<ScreenElements elements={screens} label={"Screens"} />
				<ScreenElements elements={windows} label={"Apps"} />
			</Stack>

			{open && <ScreenShareDialogPreview open={open} toggle={toggle} />}
		</Stack>
	);
}

register(ScreenShare, { name: "Screen Share", path: "/screen-share" });
