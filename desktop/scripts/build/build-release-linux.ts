import { mkdirSync } from "node:fs";
import path from "node:path";
import { desktopDir, distDir, getDockerMountPath, run } from "../shared/release-utils";

async function main() {
	const githubToken = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
	const imageTag = "elytools-linux-release-builder:local";
	const dockerfilePath = path.join("deploy", "release", "linux.Dockerfile");
	const distMountPath = `${getDockerMountPath(distDir)}:/project/desktop/dist`;
	const cacheVolume = "elytools-linux-builder-cache:/root/.cache";

	if (!githubToken) {
		throw new Error("GITHUB_TOKEN must be defined on the host before building the Linux release image.");
	}

	mkdirSync(distDir, { recursive: true });

	await run("docker", ["build", "--secret", "id=github_token,env=GITHUB_TOKEN", "-f", dockerfilePath, "-t", imageTag, "."], {
		cwd: desktopDir,
		env: {
			...process.env,
			GITHUB_TOKEN: githubToken,
		},
	});

	await run("docker", ["run", "--rm", "--volume", distMountPath, "--volume", cacheVolume, imageTag], {
		cwd: desktopDir,
	});
}

void main();
