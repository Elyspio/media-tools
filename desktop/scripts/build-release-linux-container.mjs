import { desktopDir, electronBuilderCli, run } from "./release-utils.mjs";

await run(process.execPath, [electronBuilderCli, "--config", "config/electron-builder.yml", "--linux", "AppImage", "deb", "--publish", "never"], {
	cwd: desktopDir,
});
