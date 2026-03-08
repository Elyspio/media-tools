import "reflect-metadata";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store, { history, useAppSelector } from "./store";
import Application from "./view/components/Application";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { themes } from "./config/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider as DiProvider } from "inversify-react";
import { container } from "./core/di";
import { ReduxRouter } from "@lagunovsky/redux-react-router";

function Wrapper() {
	const {
		theme,
		current,
	} = useAppSelector((state) => ({
		theme: state.theme.current === "dark" ? themes.dark : themes.light,
		current: state.theme.current,
	}));
	const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "");

	return (
		<ReduxRouter history={history} basename={basename}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Application />
					<ToastContainer theme={current} position={"top-right"} />
				</ThemeProvider>
			</StyledEngineProvider>
		</ReduxRouter>
	);
}

function App() {
	return (
		<DiProvider container={container}>
			<Provider store={store}>
				<Wrapper />
			</Provider>
		</DiProvider>
	);
}

createRoot(document.getElementById("root")!).render(<App />);
