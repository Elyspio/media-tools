import React, { useEffect, useState } from "react";
import "./Titlebar.scss";
import { Fade, IconButton, Stack, Tooltip, Typography } from "@mui/material";
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
	subtitle?: string;
}

const Titlebar: React.FC<Props> = ({ title, subtitle }) => {
	const [fullscreen, setFullscreen] = useState<boolean>();
	const [settingModalOpened, setSettingModalOpened] = useState<boolean>(false);

	useEffect(() => {
		void window.preload.ipc.send.app.screen.isFullScreen().then(setFullscreen);
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

	const location = useLocation();
	const isHome = location.pathname === routes["/"].path;

	return (
		<Stack id={"Titlebar"} direction={"row"} alignItems={"center"} px={1.5} justifyContent={"space-between"}>
			<Stack direction={"row"} alignItems={"center"} gap={0.75}>
				<Typography className={"Titlebar__appname"}>{title || window.preload.config.appName}</Typography>

				{subtitle && (
					<>
						<Typography className={"Titlebar__separator"}>/</Typography>
						<Typography className={"Titlebar__subtitle"}>{subtitle}</Typography>
					</>
				)}

				<Fade in={!isHome}>
					<IconButton size={"small"} className={"Titlebar__back"} onClick={() => window.history.back()}>
						<NavigateBefore sx={{ fontSize: 16 }} />
					</IconButton>
				</Fade>
			</Stack>

			<Stack direction={"row"} gap={0.25}>
				<Tooltip title={"Settings"} placement={"bottom"}>
					<IconButton className={"Titlebar__control"} onClick={toggleModal}>
						<SettingsIcon sx={{ fontSize: 15 }} />
					</IconButton>
				</Tooltip>

				<IconButton className={"Titlebar__control"} onClick={minimize}>
					<RemoveIcon sx={{ fontSize: 16 }} />
				</IconButton>

				<IconButton className={"Titlebar__control"} onClick={() => goFullscreen(!fullscreen)}>
					{fullscreen ? <FullscreenExitIcon sx={{ fontSize: 16 }} /> : <FullscreenIcon sx={{ fontSize: 16 }} />}
				</IconButton>

				<IconButton className={"Titlebar__control Titlebar__close"} onClick={close}>
					<Close sx={{ fontSize: 16 }} />
				</IconButton>
			</Stack>

			<Settings close={toggleModal} isOpen={settingModalOpened} />
		</Stack>
	);
};

export default Titlebar;
