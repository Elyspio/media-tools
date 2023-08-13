import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { alias, rootPath } from "./internal.webpack";


interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}


const config: Configuration = {
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias,
	},
	entry: path.resolve(rootPath, "app/src/renderer", "index.tsx"),
	target: "electron-renderer",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				include: /src/,
				use: {
					loader: "ts-loader",
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
	devServer: {
		static: {
			directory: path.resolve(rootPath, "dist/renderer"),
			publicPath: "/",
		},
		port: 2003,
		historyApiFallback: true,
		compress: true,
	},
	stats: {
		warningsFilter: x => x.message.includes("osx-temperature-sensor") || x.message.includes("encoding"),
	},
	output: {
		path: path.resolve(rootPath, "app/dist/renderer"),
		filename: "js/[name].js",
	},
	plugins: [new HtmlWebpackPlugin({ template: path.resolve(rootPath, "app", "static", "index.html") })],
	ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
};

export default config;
