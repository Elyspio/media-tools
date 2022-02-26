import { readdir, readFile, remove, rm, writeFile } from "fs-extra";
import * as path from "path";
import { spawnAsync } from "../../app/src/main/util";
import { AppsApi, AppVersion } from "./api";

const appApi = new AppsApi(undefined, "http://localhost:4001");

const packageJson = path.join(__dirname, "..", "..", "package.json");
const appPackageJson = path.join(__dirname, "..", "..", "app", "package.json");

async function updateVersion(version: string) {
	const appJson = JSON.parse((await readFile(appPackageJson)).toString());
	appJson.version = version;
	await writeFile(appPackageJson, JSON.stringify(appJson, null, 4));
}

const main = async () => {
	let pkg = JSON.parse((await readFile(packageJson)).toString());
	let pkgApp = JSON.parse((await readFile(appPackageJson)).toString());
	const originalPkg = { ...pkg };
	let [major, minor, build] = pkg.version.split(".").map((str: string) => Number.parseInt(str));
	const oldVersion = [major, minor, build].join(".");
	minor += 1;
	let version = [major, minor, build].join(".");
	pkg = { ...pkg, version };
	const updatePackageJson = (pkg: any) => writeFile(packageJson, JSON.stringify({ ...pkg }, undefined, 4));

	const nodeBinaries = path.resolve(path.dirname(packageJson), "node_modules", ".bin");

	let electronBuilderBin = path.join(nodeBinaries, "electron-builder.cmd");

	console.log("electron path", electronBuilderBin);

	try {
		// await copy(path.join(__dirname, "..", "src"), path.join(__dirname, "..", "build-config"));

		await updateVersion(version);
		await spawnAsync(`yarn build && ${electronBuilderBin} -w --publish never`, {
			cwd: path.dirname(packageJson),
			ignoreErrors: true,
			color: true,
		});
		await updateVersion(oldVersion);

		const outputFolder = path.resolve(path.dirname(packageJson), pkg.build.directories.output);
		const files = await readdir(outputFolder);
		const installerPath = files.find(f => f.endsWith(".exe") && f.includes(version)) as string;

		if (!installerPath) {
			throw new Error(`Could not find installer: ` + JSON.stringify({ version, files }));
		}

		const installerData = await readFile(path.join(outputFolder, installerPath));
		await Promise.all([
			send({ major, minor, revision: build }, [...installerData], "windows"),
			// send(version, [...installerData], "linux")
		]);

		await spawnAsync(`git tag v${version} && git push --tags`);

		await updateVersion(version);
		await remove(path.join(__dirname, "..", "..", "app", "dist"));
	} catch (e: any) {
		console.error("ERROR", e.message);
	} finally {
		await Promise.all([
			rm(path.join(__dirname, "..", "..", "app", "dist"), {
				force: true,
				recursive: true,
			}),
			//rm(path.join(__dirname, "..", "release"), { force: true, recursive: true }),
		]);
		console.log("Cleaned");
	}
};

main();

async function send(version: AppVersion, data: number[], platform: "windows" | "linux") {
	return new Promise<void>(async resolve => {
		try {
			console.log("Uploading file to server");

			await appApi.add(
				{
					binary: data,
					metadata: {
						version,
						arch: platform === "windows" ? "Win64" : "Linux64",
						name: "Elytools",
					},
				},
				{
					onUploadProgress: (...e) => console.log(...e),
					maxBodyLength: data.length * 10,
				}
			);

			resolve();

			console.log("sent to server");
		} catch (e: any) {
			console.error("Error will sending:", e.message);
			console.error("Trying again in 500ms");
			setTimeout(() => {
				resolve(send(version, data, platform));
			}, 500);
		}
	});
}

