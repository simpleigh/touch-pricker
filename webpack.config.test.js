const path = require('path');

const PrickerPlugin = require('./config/PrickerPlugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, 'src', 'index.spec.js'),
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
        filename: 'stedman-pricker.spec.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new PrickerPlugin(),
    ],
    resolve: {
        extensions: ['.ts'],
    },
};
