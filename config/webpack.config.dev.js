const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devServer: {
        openPage: 'examples/mbd.html',
        publicPath: '/dist/',
        watchContentBase: true,
    },
    output: { filename: 'touch-pricker.js' },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [paths.devDistFile],
        }),
    ],
}, banner);
