const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
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
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.dot', '.ts'],
    },
};
