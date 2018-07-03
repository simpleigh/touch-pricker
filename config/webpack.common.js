const BannerPlugin = require('webpack').BannerPlugin;
const fs = require('fs');
const path = require('path');

const banner = fs.readFileSync(
    path.resolve(__dirname, '..', 'banner.js'),
    'utf8'
);

module.exports = {
    entry: path.resolve(__dirname, '..', 'src', 'index.ts'),
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.dot$/,
                loader: 'dotjs-loader',
                options: {
                    varname: 'context',
                },
            },
        ],
    },
    output: {
        library: 'Pricker',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        new BannerPlugin({ banner, raw: true }),
    ],
    resolve: {
        extensions: ['.dot', '.js', '.ts'],
    },
};
