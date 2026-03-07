import { rmSync } from "node:fs";
import { outDir } from "./release-utils.mjs";

rmSync(outDir, { force: true, recursive: true });
