'use strict';

/* eslint-disable sort-keys */

const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devServer: {
        openPage: 'tests/SpecRunner.html',
        port: 8081,
        publicPath: '/dist/',
    },
    entry: paths.testsEntryFile,
    module: {
        rules: [
            {
                enforce: 'post',
                test: /\.dot$|\.ts$/,
                exclude: /\.spec\.ts$|tests/,
                loader: 'istanbul-instrumenter-loader',
                options: {
                    esModules: true,
                },
            },
        ],
    },
    output: { filename: 'touch-pricker.spec.js' },
}, banner);
