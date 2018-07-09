const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    entry: paths.testsEntryFile,
    output: { filename: 'touch-pricker.spec.js' },
    plugins: [
        new CleanWebpackPlugin([
            paths.testDistFile,
        ], { root: paths.rootDir }),
    ]
}, banner);
