const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
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
                options: {
                    onlyCompileBundledFiles: true,
                },
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
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.dot', '.js', '.ts'],
    },
};
