import * as React from "react";
import * as remote from "@electron/remote";

/**
 * This is a custom React hook that keeps track of the size of the application window.
 */
export function useAppDimension() {
	const [width, setWidth] = React.useState(() => remote.getCurrentWindow().getSize()[0]);
	const [height, setHeight] = React.useState(() => remote.getCurrentWindow().getSize()[1]);

	const win = React.useMemo(() => {
		const currentWindow = remote.getCurrentWindow();
		currentWindow.on("resize", () => {
			const sizes = win.getSize();
			setWidth(sizes[0]);
			setHeight(sizes[1]);
		});
		return currentWindow;
	}, []);

	return {
		width,
		height,
	};
}
