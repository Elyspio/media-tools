import { createTheme as createMuiTheme } from "@mui/material/styles";

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
			main: "#4fd2ff",
		},
		secondary: {
			main: "#00FF88",
		},
		background: {
			default: "#131313",
			paper: "#1b1b1b",
		},
	},
});
