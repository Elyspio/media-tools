import { Encoder } from "../../renderer/components/modules/internal/encoder/type";

export const delayBeforeRunningAction = 60 * 1e3;
export const encoders: Encoder[] = [
	{
		format: "x265",
		type: "CPU",
		value: {
			ffmpeg: "libx265",
			ffprobe: "hevc",
		},
	},
	{
		format: "x265",
		type: "GPU",
		value: {
			ffmpeg: "hevc_nvenc",
			ffprobe: "hevc",
		},
	},
];
