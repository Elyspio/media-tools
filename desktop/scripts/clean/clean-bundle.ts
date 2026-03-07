import { rmSync } from "node:fs";
import { outDir } from "../shared/release-utils";

rmSync(outDir, { force: true, recursive: true });
