const webpackConfig = require('./webpack.config');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: ['src/index.spec.js'],
        frameworks: ['jasmine'],
        preprocessors: {
            'src/index.spec.js': ['webpack'],
        },
        singleRun: true,
        webpack: webpackConfig,
    });
};
