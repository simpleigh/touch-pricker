'use strict';

const fs = require('fs');
const { BannerPlugin } = require('webpack');

const { version } = require('../package');
const paths = require('./paths');

// Load the banner template and add a line with the version number
const bannerLines = fs.readFileSync(paths.bannerFile, 'utf8').split('\n');
bannerLines.splice(bannerLines.length - 2, 0, ` * @version ${version}`);
const banner = bannerLines.join('\n');

module.exports = {
    plugins: [
        new BannerPlugin({ banner, raw: true }),
    ],
};
