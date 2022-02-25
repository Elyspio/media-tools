"use strict";

const path = require("path");

module.exports = {
	context: path.resolve(__dirname),
	mode: "development",
	output: {
		path: path.resolve(__dirname, "..", "app", "dist"),
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
