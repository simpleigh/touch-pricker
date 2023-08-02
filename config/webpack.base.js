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
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    onlyCompileBundledFiles: true,
                },
            },
            {
                test: /\.dot$/,
                loader: 'dotjs-loader',
                options: {
                    varname: 'context',
                },
            },
        ],
    },
    output: {
        library: 'Pricker',
        libraryTarget: 'umd',
        path: paths.distDir,
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
};
