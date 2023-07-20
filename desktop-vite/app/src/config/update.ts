import path from "path";

export const appName = "Elytools";
export const updateServer = process.env.NODE_ENV !== "production" ? "http://localhost:4000" : "https://elyspio.fr/updater";
export const updateRefreshRate = 30 * 1e3;
export const pathToInstaller = path.join(process.env.USERPROFILE as string, "temp", appName + ".exe");
