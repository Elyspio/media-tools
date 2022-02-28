const merge = require("webpack-merge").merge;

const baseConfig = require("./webpack.main.config");

module.exports = merge(baseConfig, {
	mode: "production",
});
