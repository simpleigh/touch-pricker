const BannerPlugin = require('webpack').BannerPlugin;
const fs = require('fs');
const path = require('path');

const banner = fs.readFileSync(
    path.resolve(__dirname, '..', 'banner.js'),
    'utf8'
);

module.exports = {
    plugins: [
        new BannerPlugin({ banner, raw: true }),
    ],
};
