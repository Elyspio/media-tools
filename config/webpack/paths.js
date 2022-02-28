const path = require("path");
let rootPath = path.resolve(__dirname, "..", "..");
module.exports = {
	rootPath: rootPath,
	appPath: path.resolve(rootPath, "app"),
};