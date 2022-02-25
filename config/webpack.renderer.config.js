const webpack = require("webpack");
const merge = require("webpack-merge").merge;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
	target: "electron-renderer",
	entry: {
		app: ["@babel/polyfill", "../app/src/renderer/app.tsx"],
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
			reportFiles: ["../app/src/renderer/**/*"],
			tsconfig: "../tsconfig.json",
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
