/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Webpack production build.
 *
 * Run using `yarn build:prod`.
 * @see https://webpack.js.org/configuration/
 */

'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(
    base,
    {
        devtool: 'source-map',
        mode: 'production',
        output: { filename: 'touch-pricker.min.js' },
        plugins: [
            new CopyPlugin({
                patterns: [
                    // Data tables
                    {
                        from: 'data',
                        to: 'data',
                    },

                    // Prepare examples for distribution
                    //
                    // Sources use the development bundle: swap this out for
                    // production.
                    //
                    //   ╔══════╦═════════════╤═════════════════╗
                    //   ║      ║ Development │ Production      ║
                    //   ╟──────╫─────────────┼─────────────────╢
                    //   ║ Base ║ /examples/  │ /dist/examples/ ║
                    //   ║ File ║ .js         │ .min.js         ║
                    //   ╚══════╩═════════════╧═════════════════╝
                    {
                        from: 'examples',
                        to: 'examples',
                        transform: (buffer) => {
                            const content = buffer
                                .toString()
                                .replace(
                                    '../dist/touch-pricker.js',
                                    '../touch-pricker.min.js',
                                );
                            return Buffer.from(content);
                        },
                    },
                ],
            }),
        ],
    },
    banner,
);
