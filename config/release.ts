import { readdir, readFile, remove, writeFile } from "fs-extra";
import axios from "axios";
import * as path from "path";
import { spawnAsync } from "../src/main/util";

const packageJson = path.join(__dirname, "..", "package.json");


const main = async () => {
	let pkg = JSON.parse((await readFile(packageJson)).toString());
	const originalPkg = { ...pkg };
	let [major, minor, build] = pkg.version.split(".").map((str: string) => Number.parseInt(str));
	minor += 1;
	let version = [major, minor, build].join(".");
	pkg = { ...pkg, version };
	const updatePackageJson = (pkg: any) => writeFile(packageJson, JSON.stringify({ ...pkg }, undefined, 4));


	const nodeBinaries = path.resolve(path.dirname(packageJson), "node_modules", ".bin");

	let electronBuilderBin = path.join(nodeBinaries, "electron-builder.cmd");

	console.log("electron path", electronBuilderBin);

	try {

		// await copy(path.join(__dirname, "..", "src"), path.join(__dirname, "..", "build-config"));

		await updatePackageJson(pkg);
		await spawnAsync(`yarn build && ${electronBuilderBin} -l --publish never`, { cwd: path.dirname(packageJson), ignoreErrors: true, color: true });
		await updatePackageJson(originalPkg);

		const outputFolder = path.resolve(path.dirname(packageJson), pkg.build.directories.output);
		const files = await readdir(outputFolder);
		const installerPath = files.find(f => f.slice(f.length - 4) === ".exe" && f.includes(version)) as string;

		if (!installerPath) {
			throw new Error(`Could not find installer: ` + JSON.stringify({ version, files }));
		}

		const installerData = await readFile(path.join(outputFolder, installerPath));
		await Promise.all([
			send(version, [...installerData], "windows"),
			send(version, [...installerData], "linux")
		])

		await updatePackageJson(pkg);


		await remove(path.join(__dirname, "..", "dist"));

	} catch (e) {
		console.error("ERROR", e.message);
	}


};


main();


async function send(version: string, data: number[], platform: "windows" | "linux") {

	return new Promise<void>(async resolve => {
		try {
			console.log("Uploading file to server");

			const call = await axios.post("https://elyspio.fr/updater/core/media-tools/windows", {
				data: data,
				version
			}, {
				maxBodyLength: data.length * 10,
				maxContentLength: data.length * 10,
				onUploadProgress: (...e) => console.log(e)
			});

			console.log(call.status);

			if (call.status !== 200) {
				throw new Error(`${call.status}`);
			}
			resolve();

			console.log("sent to server");
		} catch (e) {
			console.error("Error will sending:", e.message);
			console.error("Trying again in 500ms");
			setTimeout(() => {
				resolve(send(version, data, platform));
			}, 500);
		}
	});
}


// "release": "npm run build-config && util-builder -w"
