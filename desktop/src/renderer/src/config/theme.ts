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
			default: "#0e0e0e",
			paper: "#1b1b1b",
		},
	},
	typography: {
		// Global font family (optional)
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

		// Base font size (optional, default is 14px)
		fontSize: 14,

		h1: {
			fontSize: "2.5rem", // ~40px (down from 6rem/96px)
			fontWeight: 600,
			lineHeight: 1.2,
		},
		h2: {
			fontSize: "2rem", // ~32px
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h3: {
			fontSize: "1.75rem", // ~28px
			fontWeight: 600,
			lineHeight: 1.3,
		},
		h4: {
			fontSize: "1.5rem", // ~24px
			fontWeight: 500,
			lineHeight: 1.4,
		},
		h5: {
			fontSize: "1.25rem", // ~20px
			fontWeight: 500,
			lineHeight: 1.4,
		},
		h6: {
			fontSize: "1rem", // ~16px
			fontWeight: 500,
			lineHeight: 1.4,
		},
	},
});
