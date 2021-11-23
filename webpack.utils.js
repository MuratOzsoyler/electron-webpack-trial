const path = require("path")

module.exports.isWebpackDevServer = process.argv.some(a => path.basename(a) === "webpack-dev-server")
module.exports.isWatch = process.argv.includes("--watch")
