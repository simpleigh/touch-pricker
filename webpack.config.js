const DtsBundleWebpack = require('dts-bundle-webpack')
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader',
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
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
        filename: 'stedman-pricker.js',
        library: 'Pricker',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new DtsBundleWebpack({
            name: 'Pricker',
            main: 'dist/index.d.ts',
        }),
    ],
    resolve: {
        extensions: ['.dot', '.ts'],
    },
};
