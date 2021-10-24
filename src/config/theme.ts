import { createTheme as createMuiTheme } from "@mui/material/styles";
import { Logger } from "../main/util/logger";
// @ts-ignore
import * as style from "../renderer/App.scss";

const logger = Logger("Theme");

logger.info("style", style);

export const theme = createMuiTheme({
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					"&.MuiPaper-root": {
						backgroundImage: "unset !important",
					},
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {},
			},
		},
	},
	palette: {
		mode: "dark",
		primary: {
			main: style.primary,
		},
		secondary: {
			main: style.secondary,
		},
		background: {
			default: style.background,
			paper: style.background,
		},
	},
});
