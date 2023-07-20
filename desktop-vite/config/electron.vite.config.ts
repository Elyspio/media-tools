import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { UserConfig } from "vite";
import path from "path";
import renderer from "vite-plugin-electron-renderer";
import { getDefaultConfig } from "@elyspio/vite-eslint-config/vite/vite.config.js";

const root = path.resolve(__dirname, "..");
const rootApp = path.resolve(root, "app", "src");

const config = getDefaultConfig({
	basePath: root,
	checker: false,
});

const customConfig: UserConfig = {
	build: {
		rollupOptions: {
			input: path.resolve(rootApp, "index.html"),
		},
		commonjsOptions: {
			include: [path.resolve(rootApp, ".."), /node_modules/],
		},
	},
	optimizeDeps: {
		include: [path.resolve(root, "node_modules"), path.resolve(rootApp, "node_modules")],
	},
	plugins: [...(config.plugins ?? []), renderer()],
	root: path.resolve(__dirname, ".."),
};

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			lib: {
				entry: path.resolve(rootApp, "main", "index.ts"),
			},
		},
	},
	renderer: deepMerge(config, customConfig),
});

function deepMerge<T extends Record<any, any>>(target: T, ...sources: T[]): T {
	if (!sources.length) {
		return target;
	}

	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(target, { [key]: {} });
				}
				deepMerge(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}

	return deepMerge(target, ...sources);
}

function isObject(item: any): boolean {
	return item && typeof item === "object" && !Array.isArray(item);
}
