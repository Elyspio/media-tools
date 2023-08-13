import { ChildProcess, exec as _exec, spawn, SpawnOptions } from "child_process";
import { platform } from "os";
import * as process from "process";
import { promisify } from "util";
import { injectable } from "inversify";

@injectable()
export class ProcessService {
	public readonly exec = promisify(_exec);

	async spawnBinary(binary: string, param: string[], folder: string = process.cwd()) {
		const child = spawn(binary, param, { cwd: folder });
		let stdout = "",
			stderr = "";

		if (child.stdout)
			child.stdout.on("data", (data) => {
				stdout += data.toString();
			});

		if (child.stderr)
			child.stderr.on("data", (data) => {
				stderr += data.toString();
			});

		return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
			child.on("close", (code) => {
				console.log(`child process exited with code ${code}`, { binary, param, folder, stdout, stderr, code });
				resolve({ code, stdout, stderr });
			});
		});
	}

	async spawnAsync(command: string, options?: Partial<SpawnOptions> & { ignoreErrors?: boolean; color?: boolean }) {
		const child = spawn(`cmd.exe`, ["/c", ...command.split(" ")], { stdio: "inherit", ...options });

		if (child.stdout)
			child.stdout.on("data", (data) => {
				console.log("spawnAsync", data.toString());
			});

		if (child.stderr)
			child.stderr.on("data", (data) => {
				console.error("spawnAsync", data.toString());
			});

		const exitCode: number | null = await new Promise((resolve) => {
			child.on("close", (code) => {
				console.error("spawnAsync close", code);
				resolve(code);
			});
		});

		if (exitCode !== 0 && !options?.ignoreErrors) {
			throw new Error(`subprocess error exit ${exitCode} for command ${command}`);
		}
	}

	async isInstalled(app: string) {
		let command = "";
		switch (platform()) {
			case "win32":
				command = `where`;
				break;
			case "linux":
				command = `which`;
				break;
		}

		try {
			return (await this.spawnBinary(command, [app], process.cwd())).stderr.length === 0;
		} catch (e) {
			return false;
		}
	}

	async kill(process: ChildProcess) {
		if (platform() === "win32") {
			await this.spawnBinary("taskkill.exe", ["/pid", `${process.pid}`, "/f", "/t"]);
		} else {
			process.kill("SIGKILL");
		}
	}
}
