const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    output: { filename: 'touch-pricker.js' },
    plugins: [
        new CleanWebpackPlugin(
            [paths.devDistFile],
            { root: paths.rootDir }
        ),
    ],
}, banner);
