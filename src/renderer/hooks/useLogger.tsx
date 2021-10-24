import { Logger } from "../../main/util/logger";
import * as React from "react";

export function useLogger() {
	const functionName = new Error().stack!.split("\n")[2].trim().split(" ")[1];

	return React.useMemo(() => Logger(functionName), []);
}
