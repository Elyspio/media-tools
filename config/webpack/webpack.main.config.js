const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge").merge;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { appPath, rootPath } = require("./paths");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
	target: "electron-main",
	entry: {
		main: path.resolve(appPath, "src/main/main.ts"),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
							tsx: true,
							decorators: true,
							dynamicImport: true,
						},
					},
				},
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			reportFiles: [path.resolve(appPath, "src/main/**/*")],
			tsconfig: path.resolve(rootPath, "tsconfig.json"),
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),
	],
});
