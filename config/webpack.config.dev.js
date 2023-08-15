'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
        plugins: [
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [paths.devDistFile],
            }),
        ],
    },
    banner,
);
