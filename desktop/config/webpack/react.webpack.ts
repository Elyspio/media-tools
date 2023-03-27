import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import tsconfig from "../../tsconfig.json";

const rootPath = path.resolve(__dirname, "..", "..");

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

let paths = tsconfig.compilerOptions.paths;
const alias = (Object.keys(paths) as (keyof typeof paths)[]).reduce((acc, key) => {
	let p = paths[key][0];
	acc[key] = path.resolve(rootPath, p.slice(0, p.length - 1));
	return acc;
}, {} as Record<string, string>);

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
};

export default config;
