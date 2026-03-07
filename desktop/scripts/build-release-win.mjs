import { rmSync } from "node:fs";
import { desktopDir, distDir, electronBuilderCli, electronViteCli, outDir, run } from "./release-utils.mjs";

rmSync(outDir, { force: true, recursive: true });
rmSync(distDir, { force: true, recursive: true });

await run(process.execPath, [electronViteCli, "-c", "config/electron.vite.config.ts", "build"], {
	cwd: desktopDir,
});

await run(process.execPath, [electronBuilderCli, "--config", "config/electron-builder.yml", "--win", "nsis", "--publish", "never"], {
	cwd: desktopDir,
});
