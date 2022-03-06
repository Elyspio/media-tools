import React from "react";

import { register } from "../../../../decorators/Module";
import { Button, Grid } from "@mui/material";
import { useInjection } from "inversify-react";
import { FilesService } from "../../../../../main/services/files/files.service";
import { DialogService } from "../../../../../main/services/electron/dialog.service.new";

const Torrent = () => {
	const services = {
		dialog: useInjection(DialogService),
		files: useInjection(FilesService),
	};

	const click = () => {
		services.dialog.createWindow("/updater", {
			bottom: true,
			top: true,
			modal: true,
			title: "TEST",
		});
	};

	return (
		<Grid className={"Test"}>
			<Button onClick={click}>AZE</Button>
		</Grid>
	);
};

register(Torrent, { name: "Test", path: "/updater" });
