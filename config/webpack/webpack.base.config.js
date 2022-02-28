"use strict";

const path = require("path");

const { appPath } = require("./paths");

module.exports = {
	context: path.resolve(__dirname),
	mode: "development",
	output: {
		path: path.resolve(appPath, "dist"),
		filename: "[name].js",
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	optimization: {
		splitChunks: false,
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"],
	},
	devtool: "source-map",
	plugins: [],
};
