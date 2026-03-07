import path from "node:path";
import { desktopDir, electronViteCli, getDockerMountPath, outDir, run } from "./release-utils.mjs";
import { rmSync } from "node:fs";

const imageTag = "elytools-linux-release-builder:local";
const dockerMountPath = `${getDockerMountPath(desktopDir)}:/project/desktop`;
const dockerfilePath = path.join("deploy", "release", "linux.Dockerfile");

rmSync(outDir, { force: true, recursive: true });

await run(process.execPath, [electronViteCli, "-c", "config/electron.vite.config.ts", "build"], {
	cwd: desktopDir,
});

await run("docker", ["build", "-f", dockerfilePath, "-t", imageTag, "."], {
	cwd: desktopDir,
});

await run("docker", ["run", "--rm", "--volume", dockerMountPath, imageTag], {
	cwd: desktopDir,
});
