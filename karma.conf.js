/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

const webpackConfig = require('./config/webpack.config.test');

const singleRun = !!process.env.CI;

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome', 'Edge', 'Firefox', 'IE', 'PhantomJS'],
        files: [
            'tests/index.spec.js',
            'dist/touch-pricker.js',
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests/index.spec.js': ['webpack', 'sourcemap'],
        },
        singleRun,
        webpack: webpackConfig,
    });
};
