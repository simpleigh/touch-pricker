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
        new UglifyJSPlugin({
            sourceMap: true,
        }),
    ],
});
