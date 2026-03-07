import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { Root } from "../pages/Root";
import { HomeAssistant } from "@components/external/home-assistant/HomeAssistant";
import { Config } from "@components/internal/config/Config";
import { Renamer } from "@components/internal/renamer/Renamer";
import { Encoder } from "@components/internal/encoder/Encoder";
import { routes } from "@/config/routes.config";
import { Dashboard } from "@components/Dashboard";

const routesData = createRoutesFromElements(
	<Route path={"/"} element={<Root />}>
		<Route index element={<Dashboard />} />
		<Route id={routes["/external/home-assistant"].name} path={routes["/external/home-assistant"].path} element={<HomeAssistant />} />
		<Route id={routes["/internal/config"].name} path={routes["/internal/config"].path} element={<Config />} />
		<Route id={routes["/internal/encoder"].name} path={routes["/internal/encoder"].path} element={<Encoder />} />
		<Route id={routes["/internal/renamer"].name} path={routes["/internal/renamer"].path} element={<Renamer />} />
	</Route>
);

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routesData);
