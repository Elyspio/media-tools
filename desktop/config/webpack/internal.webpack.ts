import tsconfig from "../../tsconfig.json";
import path from "path";

export const rootPath = path.resolve(__dirname, "..", "..");


let paths = tsconfig.compilerOptions.paths;
export const alias = Object.keys(paths)
	.filter((p) => p.endsWith("*"))
	.reduce((acc, key) => {
		const p = paths[key as keyof typeof paths][0];
		acc[key.slice(0, key.length - 2)] = path.resolve(rootPath, p.slice(0, p.length - 1));
		return acc;
	}, {} as Record<string, string>);