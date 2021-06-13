import {remote} from "electron";


type Params = {
	folder?: string
}


export function getAppParams(): Params {
	const args = remote.process.argv;

	const folderIndex = args.indexOf("--folder");

	return {
		folder: folderIndex > -1 ? args[folderIndex + 1] : undefined
	};
}


