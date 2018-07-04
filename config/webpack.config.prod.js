const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devtool: 'source-map',
    mode: 'production',
    output: { filename: 'touch-pricker.min.js' },
    plugins: [
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false,
                }
            },
        }),
    ],
}, banner);
