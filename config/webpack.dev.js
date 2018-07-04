const merge = require('webpack-merge');

const banner = require('./webpack.banner');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: { filename: 'touch-pricker.js' },
}, banner);
