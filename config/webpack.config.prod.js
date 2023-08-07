'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devtool: 'source-map',
    mode: 'production',
    output: { filename: 'touch-pricker.min.js' },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                paths.prodDistFile,
                paths.prodMapFile,
            ],
        }),
        new CopyPlugin({
            // Prepare examples for distribution
            //
            // Sources use the development bundle: swap this out for production.
            //
            //   ╔══════╦═════════════╤═════════════════╗
            //   ║      ║ Development │ Production      ║
            //   ╟──────╫─────────────┼─────────────────╢
            //   ║ Base ║ /examples/  │ /dist/examples/ ║
            //   ║ File ║ .js         │ .min.js         ║
            //   ╚══════╩═════════════╧═════════════════╝
            patterns: [
                {
                    from: 'examples',
                    to: 'examples',
                    transform: (buffer) => {
                        const content = buffer.toString().replace(
                            '../dist/touch-pricker.js',
                            '../touch-pricker.min.js'
                        );
                        return Buffer.from(content);
                    },
                },
            ],
        }),
    ],
}, banner);
