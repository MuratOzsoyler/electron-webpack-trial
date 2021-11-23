const path = require("path")
const webpack = require("webpack")
const {isWebpackDevServer, isWatch} = require("./webpack.utils.js")

module.exports = [
    // Add support for native node modules
    {
        // We're specifying native_modules in the test because the asset relocator loader generates a
        // "fake" .node file which is really a cjs file.
        test: /native_modules\/.+\.node$/,
        use: 'node-loader',
    },
    {
        test: /\.(m?js|node)$/,
        parser: { amd: false },
        use: {
            loader: '@vercel/webpack-asset-relocator-loader',
            options: {
                outputAssetBase: 'native_modules',
            },
        },
    },
    {
        test: /\.purs$/,
        use: {
            loader: "purs-loader",
            options: {
                bundle: true,
                psc: "psa",
                pscIde: true,
                spago: true,
                watch: isWebpackDevServer || isWatch
            }
        }
    },
    // {
    //     test: [/\.ts$/, /\.tsx$/],
    //     use: {
    //         loader: "ts-loader",
    //         options: {
    //             transpileOnly: true
    //         }
    //     }
    // }
    // Put your webpack loader rules in this array.  This is where you would put
    // your ts-loader configuration for instance:
    /**
     * Typescript Example:
     *
     * {
     *   test: /\.tsx?$/,
     *   exclude: /(node_modules|.webpack)/,
     *   loaders: [{
     *     loader: 'ts-loader',
     *     options: {
     *       transpileOnly: true
     *     }
     *   }]
     * }
     */
];
