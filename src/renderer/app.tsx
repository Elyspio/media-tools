import "reflect-metadata";
import { container } from "../main/services/dependency-injection/dependency-injection.container";
import "../main/services/dependency-injection/dependency-injection.service";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Application from "./components/Application";
import { store } from "./store";
import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material/styles";
import { Logger } from "../main/util/logger";
import { Provider as DiProvider } from "inversify-react";
import { theme } from "../config/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

declare module "@mui/material/styles" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

downloadFont("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

const logger = Logger("App");

// Create main element
const mainElement = document.createElement("div");
mainElement.classList.add("root");
document.body.appendChild(mainElement);

ReactDOM.render(
	<DiProvider container={container}>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Application />
					<ToastContainer />
				</Provider>
			</ThemeProvider>
		</StyledEngineProvider>
	</DiProvider>,
	mainElement
);

function downloadFont(url: string) {
	const css = document.createElement("link");
	css.rel = "stylesheet";
	css.href = url;

	document.head.appendChild(css);
}
