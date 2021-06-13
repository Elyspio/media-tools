import {Logger as ILogger, LoggerManager} from "typescript-logger"


type TimeFunction = (str?: string) => void

export const Logger = (funcOrString: Function | string) => {
	let name = typeof funcOrString === "string" ? funcOrString : funcOrString.name;
	let logger = LoggerManager.create(name);

	// @ts-ignore
	logger.time = (str?: string) => console.time(`${name}${str ? `: ${str}` : ""}`)
	// @ts-ignore
	logger.timeEnd = (str?: string) => console.timeEnd(`${name}${str ? `: ${str}` : ""}`)
	// @ts-ignore
	logger.timeLog = (str?: string) => console.timeLog(`${name}${str ? `: ${str}` : ""}`)

	return logger as ILogger & {
		time: TimeFunction,
		timeEnd: TimeFunction,
		timeLog: TimeFunction
	};
}
