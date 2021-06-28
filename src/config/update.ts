import path from "path";

export const app_name = "media-tools";
export const updateServer = "https://elyspio.fr/updater/core/";
export const updateRefreshRate = 30 * 1e3;
export const pathToInstaller = path.join(process.env.USERPROFILE as string, "temp", app_name + ".exe");
