import path from "path";


const getEnv = (key: string) => {
	return require("process").env[key];
};

export const appName = "Elytools";
export const updateServer = process.env["NODE_ENV"] !== "production" ? "http://localhost:4000" : "https://elyspio.fr/updater";
export const updateRefreshRate = 30 * 1e3;
export const pathToInstaller = path.join(getEnv("USERPROFILE"), "temp", appName + ".exe");
