import { rmSync } from "node:fs";
import { distDir, outDir } from "./release-utils.mjs";

rmSync(outDir, { force: true, recursive: true });
rmSync(distDir, { force: true, recursive: true });
