import {Logger as ILogger} from "@tsed/logger"

export const Logger = (name: string | Function) => {

	let current = typeof name === "string" ? name : name.name;
	const logger = new ILogger(current)

	logger.appenders
		.set("stdout", {type: "stdout", levels: ["debug", "info", "trace", "warn"]})
		.set("stderr", {type: "stderr", levels: ["fatal", "error", "warn"]})
		.set("console", {type: "console"})

	return logger;
};

