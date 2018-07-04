const merge = require('webpack-merge');
const path = require('path');

const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    entry: path.resolve(__dirname, '..', 'tests', 'index.spec.js'),
    output: { filename: 'touch-pricker.spec.js' },
}, banner);
