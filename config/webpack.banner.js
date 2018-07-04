const BannerPlugin = require('webpack').BannerPlugin;
const fs = require('fs');

const paths = require('./paths');

const banner = fs.readFileSync(paths.bannerFile, 'utf8');

module.exports = {
    plugins: [
        new BannerPlugin({ banner, raw: true }),
    ],
};
