import { defineConfig } from "vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
	base: mode === "development" ? "/" : "/elytools-api/",
	build: {
		outDir: "build",
		sourcemap: true,
	},
	plugins: [
		react(),
		babel({
			include: /src[\\/].*\.tsx$/,
			presets: [reactCompilerPreset({ target: "18" })],
		}),
	],
	server: {
		host: true,
		port: 3000,
	},
}));
