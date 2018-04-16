const webpackConfig = require('./webpack.config.test');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'dist/stedman-pricker.js', nocache: true },
            'src/index.spec.js',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'src/index.spec.js': ['webpack', 'sourcemap'],
        },
        singleRun: true,
        webpack: webpackConfig,
    });
};
