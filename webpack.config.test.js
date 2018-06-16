const path = require('path');

const PrickerPlugin = require('./config/PrickerPlugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, 'tests', 'index.spec.js'),
    mode: 'development',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    output: {
        devtoolModuleFilenameTemplate: 'webpack://pricker/[resourcePath]',
        filename: 'touch-pricker.spec.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new PrickerPlugin(),
    ],
    resolve: {
        extensions: ['.ts'],
    },
};
