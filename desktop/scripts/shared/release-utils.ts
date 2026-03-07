import { spawn, type SpawnOptions } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const sharedDir = path.dirname(scriptPath);

export const scriptsDir = path.resolve(sharedDir, "..");
export const desktopDir = path.resolve(scriptsDir, "..");
export const distDir = path.join(desktopDir, "dist");
export const outDir = path.join(desktopDir, "out");
export const electronViteCli = path.join(desktopDir, "node_modules", "electron-vite", "bin", "electron-vite.js");
export const electronBuilderCli = path.join(desktopDir, "node_modules", "electron-builder", "cli.js");

export function getDockerMountPath(targetPath: string) {
	return process.platform === "win32" ? targetPath.replace(/\\/g, "/") : targetPath;
}

export function run(command: string, args: string[], options: SpawnOptions = {}) {
	return new Promise<void>((resolve, reject) => {
		const child = spawn(command, args, {
			stdio: "inherit",
			...options,
		});

		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) {
				resolve();
				return;
			}

			reject(new Error(`Command failed with exit code ${code}: ${command}`));
		});
	});
}
