import "reflect-metadata";
import { container } from "../main/di/di.container";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Application from "./components/Application";
import { store } from "./store";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Provider as DiProvider } from "inversify-react";
import { theme } from "../config/theme";
import { ToastContainer } from "react-toastify";
import "./index.scss";
import "./store/module/router/router.import";

// Create main element

const root = createRoot(document.getElementById("root")!);
root.render(
	<DiProvider container={container}>
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<Application />
					<ToastContainer theme={"dark"} position={"top-right"} className={"no-autoresize"} />
				</Provider>
			</ThemeProvider>
		</StyledEngineProvider>
	</DiProvider>,
);