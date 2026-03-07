import config from "@elyspio/vite-eslint-config/eslint.config.mjs";

/**
 * @type {import("eslint/config").Config[]}
 */
const conf = config;

conf.push({
	ignores: ["out", "build", "dist", "node_modules"],
});

export default config;
