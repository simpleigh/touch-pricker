const webpackConfig = require('./webpack.config.test');

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'dist/stedman-pricker.js', nocache: true },
            'src/index.spec.ts',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'src/index.spec.ts': ['webpack', 'sourcemap'],
        },
        singleRun: true,
        webpack: webpackConfig,
    });
};
