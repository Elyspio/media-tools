const webpack = require("webpack");
const merge = require("webpack-merge").merge;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const baseConfig = require("./webpack.base.config");
const { appPath, rootPath } = require("./paths");

module.exports = merge(baseConfig, {
	target: "electron-renderer",
	entry: {
		app: [path.resolve(appPath, "src/renderer/app.tsx")],
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
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.css$/,
				loaders: ["style-loader", "css-loader"],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							disable: true,
						},
					},
				],
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: /node_modules/,
			},
		],
	},

	plugins: [
		new ForkTsCheckerWebpackPlugin({
			reportFiles: [path.resolve(appPath, "src/renderer/**/*")],
			tsconfig: path.resolve(rootPath, "tsconfig.json"),
		}),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			title: "Elytools",
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
		}),
	],
});
