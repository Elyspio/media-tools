import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Application from "./components/Application";
import { store } from "./store";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
// @ts-ignore
import * as style from "./App.scss";

// Create main element

const css = document.createElement("link");
css.rel = "stylesheet";
css.href = "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";


const mainElement = document.createElement("div");
mainElement.classList.add("root");
document.body.appendChild(mainElement);
document.head.appendChild(css);
console.log(style);

const theme = createMuiTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: "0.75em"
			}
		}
	},
	palette: {
		type: "dark",
		primary: {
			main: style.primary
		},
		secondary: {
			main: style.secondary
		},
		background: {
			default: style.background,
			paper: style.background
		}
	}
});


ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<Application />
		</Provider>
	</MuiThemeProvider>,
	mainElement
);

