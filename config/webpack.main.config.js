const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge").merge;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
	target: "electron-main",
	entry: {
		main: "../src/main/main.ts",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					babelrc: true,
					configFile: path.resolve(__dirname, "./.babelrc.js"),
				},
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			reportFiles: ["../src/main/**/*"],
			tsconfig: path.resolve(__dirname, "..", "tsconfig.json"),
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),
	],
});
