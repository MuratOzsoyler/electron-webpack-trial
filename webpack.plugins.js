const webpack = require("webpack")
const { isWebpackDevServer, isWatch } = require("./webpack.utils")

const pluginName = "LogErrorAfterCompilation"

module.exports = [
    // new webpack.IgnorePlugin({ resourceRegExp: /\.d.ts$/ }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
].concat(
    isWebpackDevServer || isWatch ? [] : [{
        apply(compiler) {
            compiler.hooks.done.tap(pluginName, (stats) => {
                process.stderr.write(stats.toString("errors-only"))
            })
            // () => this.plugin("done", stats =>
            //     process.stderr.write(stats.toString("errors-only")))
        }
    }]
)