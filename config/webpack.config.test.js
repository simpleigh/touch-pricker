'use strict';

/* eslint-disable sort-keys */

const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devServer: {
        open: ['/tests/SpecRunner.html'],
        port: 8081,
        static: [
            {
                directory: paths.rootDir,
                publicPath: '/',
            },
        ],
    },
    entry: paths.testsEntryFile,
    module: {
        rules: [
            {
                enforce: 'post',
                test: /\.dot$|\.ts$/,
                exclude: /\.spec\.ts$|tests/,
                loader: '@jsdevtools/coverage-istanbul-loader',
                options: {
                    esModules: true,
                },
            },
        ],
    },
    output: {
        filename: 'touch-pricker.spec.js',
        publicPath: '/dist/',  // needed for webpack-dev-server
    },
}, banner);
