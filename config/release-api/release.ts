import { readdir, readFile, remove, rm, writeFile, readFileSync } from "fs-extra";
import * as path from "path";
import { spawnAsync } from "../../app/src/main/util";
import { AppArch, AppsApi, AppVersion } from "./api";
import { appPath, rootPath } from "../webpack/paths";

const appApi = new AppsApi(undefined, "http://127.0.0.1:4000");
// const appApi = new AppsApi(undefined, "https://elyspio.fr/updater");

const packageJson = path.resolve(rootPath, "package.json");
const appPackageJson = path.resolve(appPath, "package.json");

async function updateVersion(version: string) {
	const appJson = JSON.parse((await readFile(appPackageJson)).toString());
	appJson.version = version;
	await writeFile(appPackageJson, JSON.stringify(appJson, null, 4));
}

const main = async () => {
	let pkg = JSON.parse((await readFile(packageJson)).toString());
	let [major, minor, build] = pkg.version.split(".").map((str: string) => Number.parseInt(str));
	const oldVersion = [major, minor, build].join(".");
	minor += 1;
	let version = [major, minor, build].join(".");
	pkg = { ...pkg, version };

	try {
		await updateVersion(version);
		// await spawnAsync(`docker-compose up`, {
		// 	cwd:  path.resolve(__dirname, "docker"),
		// 	color: true,
		// });

		const outputFolder = path.resolve(__dirname, "releases");
		const files = (await readdir(outputFolder)).map(f => path.resolve(outputFolder, f));

		// const winInstaller = files.find(f => f.endsWith(".exe") && f.includes(version));
		// if (winInstaller) {
		// 	const data = [...(readFileSync(winInstaller))];
		// 	await send({ major, minor, revision: build, raw: version }, data, AppArch.Win32);
		// 	await send({ major, minor, revision: build, raw: version }, data, AppArch.Win64);
		// }

		const debInstaller = files.find(f => f.endsWith(".deb") && f.includes(version));
		if (debInstaller) {
			const data = [...(readFileSync(debInstaller))];
			await send({ major, minor, revision: build, raw: version }, data, AppArch.LinuxDeb);
		}

		const snapInstaller = files.find(f => f.endsWith(".snap") && f.includes(version));
		if (snapInstaller) {
			const data = [...(readFileSync(snapInstaller))];
			await send({ major, minor, revision: build, raw: version }, data, AppArch.LinuxSnap);
		}

		const rpmInstaller = files.find(f => f.endsWith(".rpm") && f.includes(version));
		if (rpmInstaller) {
			const data = [...(readFileSync(rpmInstaller))];
			await send({ major, minor, revision: build, raw: version }, data, AppArch.LinuxRpm);
		}

		// await spawnAsync(`git tag v${version} && git push --tags`);
	} catch (e : any) {
		console.error("ERROR", e.message);
		await updateVersion(oldVersion);
	} finally {
		await Promise.all([
			rm(path.join(appPath, "dist"), {
				force: true,
				recursive: true,
			}),
		]);
		console.log("Cleaned");
	}
};

main();

async function send(version: AppVersion, data: number[], arch: AppArch) {
	return new Promise<void>(async resolve => {
		try {
			console.log(`Uploading installer for ${arch}`);

			await appApi.add(
				{
					binary: data,
					metadata: {
						version,
						arch,
						name: "Elytools",
					},
				},
				{
					onUploadProgress: (...e) => console.log(...e),
					maxBodyLength: data.length * 10,
				}
			);

			resolve();

			console.log(`installer for ${arch} sent to server`);
		} catch (e: any) {
			console.error("Error will sending:", e.message);
			console.error("Trying again in 500ms");
			setTimeout(() => {
				resolve(send(version, data, arch));
			}, 500);
		}
	});
}
