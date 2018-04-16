const webpackConfig = require('./webpack.config.test');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'dist/stedman-pricker.js', nocache: true },
            'tests/index.spec.js',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests/index.spec.js': ['webpack', 'sourcemap'],
        },
        singleRun: true,
        webpack: webpackConfig,
    });
};
