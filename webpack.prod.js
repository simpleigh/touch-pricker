const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: 'touch-pricker.min.js',
    },
    plugins: [
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'dist', 'touch-pricker.min.js'),
            path.resolve(__dirname, 'dist', 'touch-pricker.min.js.map'),
        ]),
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],
});
