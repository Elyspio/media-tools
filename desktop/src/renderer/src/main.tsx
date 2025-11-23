import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@view/router/Router";
import { Provider } from "react-redux";
import { store } from "@store";
import { initApp } from "@modules/configuration/configuration.async.actions";

store.dispatch(initApp()).then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</StrictMode>
	);
});
