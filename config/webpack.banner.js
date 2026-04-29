/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Webpack configuration that adds our copyright banner.
 * @see https://webpack.js.org/configuration/
 * @see https://webpack.js.org/plugins/banner-plugin/
 */

'use strict';

const fs = require('fs');
const { BannerPlugin } = require('webpack');

const { version } = require('../package');
const paths = require('./paths');

// Load the banner template and add a line with the version number.
const bannerLines = fs.readFileSync(paths.bannerFile, 'utf8').split('\n');
bannerLines.splice(bannerLines.length - 2, 0, ` * @version ${version}`);
const banner = bannerLines.join('\n');

module.exports = {
    plugins: [new BannerPlugin({ banner, raw: true })],
};
