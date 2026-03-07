import { rmSync } from "node:fs";
import { distDir, outDir } from "../shared/release-utils";

rmSync(outDir, { force: true, recursive: true });
rmSync(distDir, { force: true, recursive: true });
