const merge = require('webpack-merge');

const paths = require('./paths');
const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    devServer: {
        openPage: 'tests/SpecRunner.html',
        port: 8081,
        publicPath: '/dist/',
    },
    entry: paths.testsEntryFile,
    output: { filename: 'touch-pricker.spec.js' },
}, banner);
