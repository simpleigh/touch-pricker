const path = require('path');

const entry = path.resolve(__dirname, 'src', 'index.spec.js');

module.exports = {
    devtool: 'inline-source-map',
    entry,
    externals: (context, request, callback) => {
        const requestPath = path.resolve(context, request);

        if (requestPath === entry) {
            callback(); // Entry: add to bundle
        } else if (request.match(/\.spec(\.ts)?$/)) {
            callback(); // Spec: add to bundle
        } else {
            // Source file: load from source bundle as external
            const relativePath = path.relative(
                path.resolve(__dirname, 'src'),
                requestPath
            );
            const objectLookup = relativePath
                .split(path.sep)
                .map(r => `[${JSON.stringify(r)}]`)
                .join('');

            // Load requested item from top-level Pricker object
            callback(null, `{ default: Pricker${objectLookup} }`);
        }
    },
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
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    output: {
        filename: 'stedman-pricker.spec.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts'],
    },
};
