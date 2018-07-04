const merge = require('webpack-merge');
const path = require('path');

const banner = require('./webpack.banner');
const common = require('./webpack.common');

module.exports = merge(common, {
    entry: path.resolve(__dirname, '..', 'tests', 'index.spec.js'),
    output: { filename: 'touch-pricker.spec.js' },
}, banner);
