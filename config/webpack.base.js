/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Shared configuration for Webpack.
 * @see https://webpack.js.org/configuration/
 */

'use strict';

const paths = require('./paths');

module.exports = {
    devtool: 'inline-source-map',
    entry: paths.srcEntryFile,
    mode: 'development',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                options: {
                    onlyCompileBundledFiles: true,
                },
                test: /\.ts$/u,
            },
            {
                loader: 'dotjs-loader',
                options: {
                    varname: 'context',
                },
                test: /\.dot$/u,
            },
        ],
    },
    output: {
        globalObject: 'this',
        library: {
            name: 'Pricker',
            type: 'umd',
            umdNamedDefine: true,
        },
        path: paths.distDir,
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
};
