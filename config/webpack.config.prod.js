const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devtool: 'source-map',
    mode: 'production',
    output: { filename: 'touch-pricker.min.js' },
    plugins: [
        new CleanWebpackPlugin(
            [paths.prodDistFile, paths.prodMapFile],
            { root: paths.rootDir }
        ),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false,
                },
            },
        }),
        new CopyWebpackPlugin([
            /**
             * Prepare examples for distribution
             *
             * Sources use the development bundle: swap this out for production.
             *
             *   ╔══════╦═════════════╤═════════════════╗
             *   ║      ║ Development │ Production      ║
             *   ╟──────╫─────────────┼─────────────────╢
             *   ║ Base ║ /examples/  │ /dist/examples/ ║
             *   ║ File ║ .js         │ .min.js         ║
             *   ╚══════╩═════════════╧═════════════════╝
             */
            {
                from: 'examples',
                to: 'examples',
                transform: (buffer) => {
                    const content = buffer.toString().replace(
                        '../dist/touch-pricker.js',
                        '../touch-pricker.min.js'
                    )
                    return Buffer.from(content);
                },
            },
        ]),
    ],
}, banner);
