const merge = require('webpack-merge');

const banner = require('./webpack.banner');
const base = require('./webpack.base');

module.exports = merge(base, {
    output: { filename: 'touch-pricker.js' },
}, banner);
