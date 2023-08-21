'use strict';

/* eslint-disable sort-keys */

const paths = require('./paths');

module.exports = {
    devtool: 'inline-source-map',
    entry: paths.srcEntryFile,
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/u,
                loader: 'ts-loader',
                options: {
                    onlyCompileBundledFiles: true,
                },
            },
            {
                test: /\.dot$/u,
                loader: 'dotjs-loader',
                options: {
                    varname: 'context',
                },
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
