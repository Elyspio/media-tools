import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControlLabel,
	FormGroup,
	List,
	ListItem,
	ListSubheader,
	Stack,
	Switch,
	TextField,
	Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Settings.scss";
import { resetDimensions, setConfig } from "@modules/configuration/configuration.async.actions";
import { useAppDispatch, useAppSelector } from "@store";
import { AppBoardShow, FrameConfiguration, LatestConfig } from "@shared/config/app.config";
import { toast } from "react-toastify";

type OwnProps = {
	isOpen: boolean;
	close: () => void;
};

export const Settings: React.FC<OwnProps> = ({ close, isOpen }) => {
	const config = useAppSelector((state) => state.config.current);
	const dispatch = useAppDispatch();
	const [draftConfig, setDraftConfig] = useState<LatestConfig | null>(null);
	const [authStatus, setAuthStatus] = useState({ configured: false, authenticated: false, hasRefreshToken: false });
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const appboardOptions = useMemo(() => [AppBoardShow.external, AppBoardShow.internal, AppBoardShow.hidden], []);

	const refreshAuthStatus = useCallback(async () => {
		setAuthStatus(await window.preload.ipc.send.auth.oidc.status());
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		void refreshAuthStatus();
	}, [isOpen, refreshAuthStatus]);

	useEffect(() => {
		if (!isOpen || !config?.frame || !config?.endpoints) return;
		setDraftConfig(config);
	}, [config, isOpen]);

	const updateDraft = useCallback((updater: (draft: LatestConfig) => LatestConfig) => {
		setDraftConfig((prev) => {
			if (!prev) return prev;
			return updater(prev);
		});
	}, []);

	const saveConfig = useCallback(async () => {
		if (!draftConfig) return;
		await dispatch(setConfig(draftConfig));
	}, [dispatch, draftConfig]);

	const toggleResources = useCallback(
		(newState: boolean) => {
			updateDraft((draft) => ({
				...draft,
				frame: {
					...draft.frame,
					show: {
						...draft.frame.show,
						resourceUtilization: newState,
					},
				},
			}));
		},
		[updateDraft]
	);

	const toggleResize = useCallback(
		(dimension: keyof FrameConfiguration["resize"], state: boolean) => {
			updateDraft((draft) => ({
				...draft,
				frame: {
					...draft.frame,
					resize: {
						...draft.frame.resize,
						[dimension]: state,
					},
				},
			}));
		},
		[updateDraft]
	);

	const setOidcField = useCallback(
		(field: "issuerUrl" | "clientId" | "scopes" | "redirectPath", value: string) => {
			updateDraft((draft) => ({
				...draft,
				endpoints: {
					...draft.endpoints,
					oidc: {
						...draft.endpoints.oidc,
						[field]: value,
					},
				},
			}));
		},
		[updateDraft]
	);

	const setEndpointField = useCallback(
		(field: "homeAssistant" | "api", value: string) => {
			updateDraft((draft) => ({
				...draft,
				endpoints: {
					...draft.endpoints,
					[field]: value,
				},
			}));
		},
		[updateDraft]
	);

	const setScreenshareHub = useCallback(
		(value: string) => {
			updateDraft((draft) => ({
				...draft,
				endpoints: {
					...draft.endpoints,
					hubs: {
						...draft.endpoints.hubs,
						screenshare: value,
					},
				},
			}));
		},
		[updateDraft]
	);

	const setQbittorrentApiBaseUrl = useCallback(
		(apiBaseUrl: string) => {
			updateDraft((draft) => ({
				...draft,
				endpoints: {
					...draft.endpoints,
					qbittorrent: {
						...draft.endpoints.qbittorrent,
						apiBaseUrl,
					},
				},
			}));
		},
		[updateDraft]
	);

	const toggleAppboard = useCallback(
		(value: AppBoardShow, checked: boolean) => {
			updateDraft((draft) => {
				const show = draft.appboard.show;
				const next = checked ? Array.from(new Set([...show, value])) : show.filter((entry) => entry !== value);
				return {
					...draft,
					appboard: {
						...draft.appboard,
						show: next,
					},
				};
			});
		},
		[updateDraft]
	);

	const login = useCallback(async () => {
		setIsAuthenticating(true);
		try {
			await saveConfig();
			await window.preload.ipc.send.auth.oidc.startLogin();
			await refreshAuthStatus();
			toast.success("Authenticated successfully");
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setIsAuthenticating(false);
		}
	}, [refreshAuthStatus, saveConfig]);

	const logout = useCallback(async () => {
		await window.preload.ipc.send.auth.oidc.logout();
		await refreshAuthStatus();
	}, [refreshAuthStatus]);

	const saveAll = useCallback(async () => {
		try {
			await saveConfig();
			toast.success("Settings saved");
			close();
		} catch (error) {
			toast.error((error as Error).message);
		}
	}, [close, saveConfig]);

	if (!draftConfig?.frame || !draftConfig?.endpoints) return null;

	return (
		<Dialog open={isOpen} onClose={close} fullWidth maxWidth={"sm"} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Settings</DialogTitle>
			<DialogContent className={"Settings"} dividers>
				<Stack className={"main"}>
					<Stack direction="column" spacing={2.5}>
						<List subheader={<ListSubheader color={"primary"}>General Endpoints</ListSubheader>}>
							<Stack spacing={1.75}>
								<TextField
									label="Home Assistant URL"
									value={draftConfig.endpoints.homeAssistant}
									onChange={(e) => setEndpointField("homeAssistant", e.target.value)}
									size="small"
								/>
								<TextField label="API URL" value={draftConfig.endpoints.api} onChange={(e) => setEndpointField("api", e.target.value)} size="small" />
								<TextField
									label="Screenshare hub"
									value={draftConfig.endpoints.hubs.screenshare}
									onChange={(e) => setScreenshareHub(e.target.value)}
									size="small"
								/>
							</Stack>
						</List>

						<Divider />

						<List subheader={<ListSubheader color={"primary"}>Torrent & Authentication</ListSubheader>}>
							<Stack spacing={1.75}>
								<TextField
									label="qBittorrent API base URL"
									value={draftConfig.endpoints.qbittorrent.apiBaseUrl}
									onChange={(e) => setQbittorrentApiBaseUrl(e.target.value)}
									size="small"
								/>
								<TextField
									label="OIDC issuer URL"
									value={draftConfig.endpoints.oidc.issuerUrl}
									onChange={(e) => setOidcField("issuerUrl", e.target.value)}
									size="small"
								/>
								<TextField
									label="OIDC client ID"
									value={draftConfig.endpoints.oidc.clientId}
									onChange={(e) => setOidcField("clientId", e.target.value)}
									size="small"
								/>
								<TextField label="OIDC scopes" value={draftConfig.endpoints.oidc.scopes} onChange={(e) => setOidcField("scopes", e.target.value)} size="small" />
								<TextField
									label="OIDC redirect path"
									value={draftConfig.endpoints.oidc.redirectPath}
									onChange={(e) => setOidcField("redirectPath", e.target.value)}
									size="small"
									helperText={`Final redirect URI: elytools://${draftConfig.endpoints.oidc.redirectPath.replace(/^\//, "")}`}
								/>
								<Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" pl={0.5}>
									{!authStatus.authenticated ? (
										<Button size={"small"} variant="outlined" color={"secondary"} disabled={isAuthenticating} onClick={() => void login()}>
											Login
										</Button>
									) : (
										<Button size={"small"} variant="outlined" color={"secondary"} onClick={() => void logout()}>
											Logout
										</Button>
									)}
									<Typography variant="caption">{authStatus.authenticated ? "Authenticated" : "Not authenticated"}</Typography>
								</Stack>
							</Stack>
						</List>

						<Divider />

						<List
							disablePadding
							subheader={
								<ListSubheader color={"primary"} disableGutters>
									Frame
								</ListSubheader>
							}
						>
							<ListItem>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch color={"default"} checked={draftConfig.frame.show.resourceUtilization} onChange={(e) => toggleResources(e.target.checked)} />
										}
										label="Show resource utilization"
									/>
									<FormControlLabel
										control={<Switch color={"default"} checked={draftConfig.frame.resize.width} onChange={(e) => toggleResize("width", e.target.checked)} />}
										label="Allow width resize"
									/>
									<FormControlLabel
										control={<Switch color={"default"} checked={draftConfig.frame.resize.height} onChange={(e) => toggleResize("height", e.target.checked)} />}
										label="Allow height resize"
									/>
								</FormGroup>
							</ListItem>
							<Button variant="outlined" onClick={() => void dispatch(resetDimensions())}>
								Auto
							</Button>
						</List>

						<Divider />

						<List subheader={<ListSubheader color={"primary"}>Appboard</ListSubheader>}>
							<FormGroup>
								{appboardOptions.map((option) => (
									<FormControlLabel
										key={option}
										control={<Checkbox checked={draftConfig.appboard.show.includes(option)} onChange={(e) => toggleAppboard(option, e.target.checked)} />}
										label={option}
									/>
								))}
							</FormGroup>
						</List>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ width: "100%" }}>
				<Stack className="footer" direction="row" justifyContent="space-between" alignItems="center" p={1} width={"100%"}>
					<Typography variant="caption">Config version: {draftConfig.version}</Typography>
					<Button variant="contained" onClick={() => void saveAll()}>
						Save all settings
					</Button>
				</Stack>
			</DialogActions>
		</Dialog>
	);
};

export default Settings;
