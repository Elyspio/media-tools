import { desktopDir, electronViteCli, run } from "./release-utils.mjs";

await run(process.execPath, [electronViteCli, "-c", "config/electron.vite.config.ts", "build"], {
	cwd: desktopDir,
});
