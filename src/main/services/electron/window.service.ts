import { Configuration } from "../configuration/configuration.service";
import { injectable } from "inversify";
import { windowOption } from "../../../config/electron";

const { BrowserWindow } = require("@electron/remote");
type Dimensions = (keyof Configuration["frame"]["resize"])[];

@injectable()
export class WindowService {
	public async isUnderSized(dimensions: Dimensions): Promise<{ height: number; width: number }> {
		return new Promise(resolve => {
			let incrementWidth = 0;
			let incrementHeight = 0;

			document.querySelectorAll("div").forEach(elem => {
				if (dimensions.includes("width") && elem.scrollWidth > elem.clientWidth) {
					incrementWidth = incrementWidth > elem.scrollWidth - elem.clientWidth ? incrementWidth : elem.scrollWidth - elem.clientWidth;
				}

				if (dimensions.includes("height") && elem.scrollHeight > elem.clientHeight) {
					incrementHeight = incrementHeight > elem.scrollHeight - elem.clientHeight ? incrementHeight : elem.scrollHeight - elem.clientHeight;
				}
			});

			resolve({
				height: incrementHeight,
				width: incrementWidth,
			});
		});
	}

	public resize(delta: { width: number; height: number }) {
		const window = BrowserWindow.getFocusedWindow();

		if (window) {
			const [width, height] = window.getSize();

			for (let i = 0; i < 20; i++) {
				if (delta.width > 0) {
					window.setSize(Math.ceil(width + (i * delta.width) / 20) + 5, height, true);
				}

				if (delta.height > 0) {
					window.setSize(width, Math.ceil(height + (i * delta.height) / 20) + 5, true);
				}
			}
		}
	}

	public resetDimensions() {
		const window = BrowserWindow.getFocusedWindow();
		window?.setSize(windowOption.width!, windowOption.height!);
	}
}
