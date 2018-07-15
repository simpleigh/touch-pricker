const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devtool: 'source-map',
    mode: 'production',
    output: { filename: 'touch-pricker.min.js' },
    plugins: [
        new CleanWebpackPlugin(
            [paths.prodDistFile, paths.prodMapFile],
            { root: paths.rootDir }
        ),
        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                output: {
                    comments: false,
                }
            },
        }),
        new TypedocWebpackPlugin({
            name: 'Free Touch Pricker',
            out: paths.docsPath,
        }),
    ],
}, banner);
