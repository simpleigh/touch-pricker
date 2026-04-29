/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Webpack development build.
 *
 * Run using `yarn build:dev`.
 * @see https://webpack.js.org/configuration/
 */

'use strict';

const { merge } = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(
    base,
    {
        devServer: {
            open: ['/examples/mbd.html'],
            static: [
                {
                    directory: paths.dataDir,
                    publicPath: '/data/',
                },
                {
                    directory: paths.examplesDir,
                    publicPath: '/examples/',
                },
            ],
        },
        output: {
            filename: 'touch-pricker.js',
            publicPath: '/dist/', // needed for webpack-dev-server
        },
    },
    banner,
);
