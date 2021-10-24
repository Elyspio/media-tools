const merge = require("webpack-merge").merge;

const baseConfig = require("./webpack.renderer.config");

module.exports = merge(baseConfig, {
	mode: "production"
});
