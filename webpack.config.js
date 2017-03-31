var path = require('path');

module.exports = {
    entry: './src/Row.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'stedman-pricker.js',
        library: 'Pricker',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    }
}
