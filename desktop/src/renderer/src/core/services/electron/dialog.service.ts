import { injectable } from "inversify";

@injectable()
export class DialogService {
	/**
	 * @param returnFiles flag to make the function return files in the folder
	 */
	public async selectFolder<WithFiles extends boolean>(returnFiles: WithFiles) {
		const result = await window.preload.ipc.send.dialog.selectDirectory<WithFiles>(returnFiles);

		if (!result) return null;

		return result;
	}
}
