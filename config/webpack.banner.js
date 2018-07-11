const BannerPlugin = require('webpack').BannerPlugin;
const fs = require('fs');

const package = require('../package.json');
const paths = require('./paths');

// Load the banner template and add a line with the version number
const bannerLines = fs.readFileSync(paths.bannerFile, 'utf8').split('\n');
bannerLines.splice(bannerLines.length - 2, 0, ` * @version ${package.version}`);
const banner = bannerLines.join('\n');

module.exports = {
    plugins: [
        new BannerPlugin({ banner, raw: true }),
    ],
};
