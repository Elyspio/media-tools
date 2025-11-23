import React, { useEffect, useState } from "react";
import "./Titlebar.scss";
import { Button, Fade, IconButton, Stack, Typography, useTheme } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RemoveIcon from "@mui/icons-material/Remove";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import Close from "@mui/icons-material/Close";
import Settings from "../settings/Settings";
import { routes } from "@/config/routes.config";
import { useLocation } from "react-router";

interface Props {
	title?: string;
}

const Titlebar: React.FC<Props> = ({ title }) => {
	const [fullscreen, setFullscreen] = useState<boolean>();
	const [settingModalOpened, setSettingModalOpened] = useState<boolean>(false);

	useEffect(() => {
		window.preload.ipc.send.app.screen.isFullScreen().then(setFullscreen);
	}, []);

	const toggleModal = () => {
		setSettingModalOpened((prev) => !prev);
	};

	const close = () => {
		return window.preload.ipc.send.app.close();
	};

	const minimize = () => {
		return window.preload.ipc.send.app.screen.minimize();
	};

	const goFullscreen = (state: boolean) => {
		setFullscreen(state);
		return window.preload.ipc.send.app.screen.toggleFullScreen();
	};

	const theme = useTheme();
	const location = useLocation();

	return (
		<Stack id={"Titlebar"} bgcolor={theme.palette.background.default} direction={"row"} spacing={1} alignItems={"center"} pl={2} justifyContent={"space-between"}>
			<Stack direction={"row"} spacing={1} alignItems={"center"}>
				<Typography color={"gray"}>{title || window.preload.config.appName}</Typography>

				<Fade in={location.pathname !== routes["/"].path}>
					<IconButton size={"small"} onClick={() => window.history.back()}>
						<NavigateBefore {...svgProps} fontSize={"small"} />
					</IconButton>
				</Fade>
			</Stack>

			<Stack direction={"row"} spacing={1}>
				<Button onClick={toggleModal}>
					<SettingsIcon {...svgProps} fontSize={"small"} />
				</Button>

				<Button onClick={minimize}>
					<RemoveIcon {...svgProps} />
				</Button>

				<Button onClick={() => goFullscreen(!fullscreen)}>{fullscreen ? <FullscreenExitIcon {...svgProps} /> : <FullscreenIcon {...svgProps} />}</Button>

				<Button className={"close"} color={"error"} onClick={close}>
					<Close {...svgProps} />
				</Button>
			</Stack>

			<Settings close={toggleModal} isOpen={settingModalOpened} />
		</Stack>
	);
};

const svgProps = { htmlColor: "gray" };

export default Titlebar;
