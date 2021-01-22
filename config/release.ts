import { readdir, readFile, writeFile } from "fs-extra";
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

		await updatePackageJson(pkg);
		await spawnAsync(`yarn build && ${electronBuilderBin} -w --publish never`, { cwd: path.dirname(packageJson), ignoreErrors: true, color: true });
		await updatePackageJson(originalPkg);

		const outputFolder = path.resolve(path.dirname(packageJson), pkg.build.directories.output);
		const files = await readdir(outputFolder);
		const installerPath = files.find(f => f.slice(f.length - 4) === ".exe" && f.includes(version)) as string;

		if (!installerPath) {
			throw new Error(`Could not find installer: ` + JSON.stringify({ version, files }));
		}

		const installerData = await readFile(path.join(outputFolder, installerPath));

		const arrayData = [...installerData];
		console.log("Uploading file to server");
		const call = await axios.post("http://192.168.0.50/updater/core/media-tools/windows", {
			data: arrayData,
			version
		}, {
			maxBodyLength: arrayData.length * 10,
			maxContentLength: arrayData.length * 10,
			onUploadProgress: (...e) => console.log(e)
		});

		console.log(call.status);

		if (call.status !== 200) {
			throw new Error(`${call.status}`);
		}

		console.log("sent to server");
		await updatePackageJson(pkg);
	} catch (e) {
		console.error("ERROR", e.message);
	}


};


main();


// "release": "npm run build && util-builder -w"
