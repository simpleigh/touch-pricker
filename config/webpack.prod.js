const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const banner = require('./webpack.banner');
const common = require('./webpack.common');

module.exports = merge(common, {
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
