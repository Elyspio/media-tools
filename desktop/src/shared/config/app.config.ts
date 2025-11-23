import { BrowserWindowConstructorOptions } from "electron";
import { AppBoardShow } from "../../renderer/src/config/configuration";

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type LocalConfig = LocalConfigV1;

export type LatestConfig = LocalConfigV1;

export type PositionWindowKey = "main";

export type FrameConfiguration = {
	show: {
		resourceUtilization: boolean;
	};
	resize: {
		height: boolean;
		width: boolean;
	};
};

export type LocalConfigV1 = {
	/**
	 * Config version, not app version
	 */
	version: 1;
	windows: {
		position: PartialRecord<PositionWindowKey, WindowPosition>;
	};
	appboard: {
		show: AppBoardShow[];
	};
	frame: FrameConfiguration;
	endpoints: {
		homeAssistant: string;
		api: string;
		hubs: {
			screenshare: string;
		};
	};
};
export type WindowPosition = Pick<BrowserWindowConstructorOptions, "x" | "y" | "width" | "height">;
