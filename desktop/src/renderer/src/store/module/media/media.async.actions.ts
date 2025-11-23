import { webContainer } from "@core/di/web.container";
import { DialogService } from "@services/electron/dialog.service";
import { createAsyncActionGenerator } from "@store/utils/utils.actions";

const createAsyncThunk = createAsyncActionGenerator("media");

export const selectFolder = createAsyncThunk("select/folder", async () => {
	const processService = webContainer.get(DialogService);
	return await processService.selectFolder(true);
});
