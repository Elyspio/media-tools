import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";

import Application from "./components/Application";
import {store} from "./store";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
// @ts-ignore
import * as  style from "./App.scss";
import "./App.scss";
import {SnackbarProvider} from "notistack";
import {Logger} from "../main/util/logger";

downloadFont("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");


const logger = Logger("App")
logger.info("style", style);

// Create main element
const mainElement = document.createElement("div");
mainElement.classList.add("root");
document.body.appendChild(mainElement);

export const theme = createTheme()


ReactDOM.render(
	<SnackbarProvider maxSnack={3}>
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<Application/>
			</Provider>
		</MuiThemeProvider>
	</SnackbarProvider>,
	mainElement
);


function downloadFont(url: string) {
	const css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = url;


	document.head.appendChild(css);
}


function createTheme() {
	return createMuiTheme({
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
}
