import {promisify} from "util";
import {exec as _exec, spawn} from "child_process";
import {File, Media, Stream} from "../../../renderer/components/modules/internal/encoder/type";
import {EventEmitter} from "events";
import * as path from "path";
import {isInstalled} from "../../util";
import {store} from "../../../renderer/store";
import {setFFmpegInstalled, setProgress} from "../../../renderer/store/module/media/media.action";


export class MediaService {
	public async getInfo(file: File) {
		try {
			const {stdout} = await exec(`ffprobe.exe  -v quiet -print_format json -show_format -show_streams "${file.path}"`);
			return JSON.parse(stdout);
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	public async checkIfFFmpegInstalled() {
		const bool = await isInstalled("ffmpeg");
		store.dispatch(setFFmpegInstalled(bool));
		return bool;
	}

	public async convert(input: Media, format: string, options?: { outputPath: string }): Promise<[EventEmitter, ReturnType<typeof spawn>]> {
		try {
			const outputPath = options?.outputPath ?? path.join(__dirname, "output.mkv");
			const process = spawn("ffmpeg.exe", ["-y", "-i", input.file.path, "-map", "0", "-c:v", format, "-progress", "-", "-nostats", outputPath], {stdio: "pipe"});
			const s = new EventEmitter();
			if (input.property === undefined) {
				input.property = await this.getInfo(input.file);
			}

			const stream = input.property.streams.find(stream => stream.codec_type === "video") as Stream;
			let parts = stream.avg_frame_rate.split("/");
			const framerate = Number.parseFloat(parts[0]) / Number.parseFloat(parts[1]);


			const nbFrames = framerate * Number.parseFloat(input.property.format.duration);

			process.on("error", console.error);
			process.stderr.on("data", (e) => console.error("process.data", e.toString()));
			process.stderr.on("error", (e) => console.error("process.stdeer", e.toString()));
			process.stdout.on("error", (e) => console.error("process.stdout", e.toString()));
			process.stdout.on("data", (chunk: string) => {
				const obj = this.getFFMpegProgress(chunk);
				let percentage = obj.frame / nbFrames * 100;
				s.emit("progress", percentage);
				store.dispatch(setProgress({media: input, percentage}));
			});


			process.on("close", () => s.emit("finished", outputPath));
			return [s, process];

		} catch (e) {
			console.error(e);
			throw e;
		}

	}

	private getFFMpegProgress(chunk: string): FFMPpegProgress {
		const data = chunk.toString().split("\n").map(line => line.split("="));
		return {
			frame: Number.parseInt(data[0][1]),
			fps: Number.parseInt(data[1][1]),
			stream: data[2][1],
			bitrate: Number.parseInt(data[3][1].slice(0, data[3][1].length - 7)),
			totalSize: Number.parseInt(data[4][1]),
			outTimeUs: Number.parseInt(data[5][1]),
			outTimeMs: Number.parseInt(data[6][1]),
			outTime: data[7][1],
			dupFrame: Number.parseInt(data[8][1]),
			dropFrame: Number.parseInt(data[9][1]),
			speed: Number.parseInt(data[10][1].slice(0, data[9][1].length - 1)),
			progress: data[11][1] as any
		};
	}

}

const exec = promisify(_exec);


interface FFMPpegProgress {
	frame: number,
	fps: number,
	stream: string,
	bitrate: number
	totalSize: number,
	outTimeUs: number,
	outTimeMs: number,
	outTime: string,
	dupFrame: number,
	dropFrame: number,
	speed: number,
	progress: "continue" | "end"
}
