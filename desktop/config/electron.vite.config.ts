import { bytecodePlugin, defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import { convertPathToAlias } from "@elyspio/vite-eslint-config";
// @ts-ignore
import tsconfigNode from "../tsconfig.node.json";
// @ts-ignore
import tsconfigWeb from "../tsconfig.web.json";
import path from "node:path";

const basePath = path.join(__dirname, "..");

const nodeAlias = convertPathToAlias(tsconfigNode.compilerOptions.paths, basePath);
const rendererAlias = convertPathToAlias(tsconfigWeb.compilerOptions.paths, basePath);

console.log({
	nodeAlias,
	rendererAlias,
});

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin(), bytecodePlugin()],
		resolve: {
			alias: nodeAlias,
		},
	},
	preload: {
		plugins: [externalizeDepsPlugin(), bytecodePlugin()],
		resolve: {
			alias: nodeAlias,
		},
	},
	renderer: {
		resolve: {
			alias: rendererAlias,
		},
		plugins: [react({})],
	},
});
