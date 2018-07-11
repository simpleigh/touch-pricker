const paths = require('./paths');

module.exports = {
    devtool: 'inline-source-map',
    entry: paths.srcEntryFile,
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
        path: paths.distDir,
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.dot', '.js', '.ts'],
    },
};
