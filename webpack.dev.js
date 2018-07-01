const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
    devServer: {
        openPage: 'examples/test.html',
        publicPath: '/dist/',
        watchContentBase: true,
    },
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        filename: 'touch-pricker.js',
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'dist', 'touch-pricker.js'),
        ]),
    ],
});
