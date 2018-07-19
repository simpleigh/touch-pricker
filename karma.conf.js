/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

const paths = require('./config/paths');
const webpackConfig = require('./config/webpack.config.test');

const singleRun = !!process.env.CI;

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome', 'Edge', 'Firefox', 'IE', 'PhantomJS'],
        coverageIstanbulReporter: {
            combineBrowserReports: true,
            dir: paths.coveragePath,
            fixWebpackSourcePaths: true,
            reports: ['html', 'lcovonly', 'text-summary'],
        },
        files: [paths.testsEntryFile],
        frameworks: ['jasmine'],
        preprocessors: {
            [paths.testsEntryFile]: ['webpack'],
        },
        reporters: ['progress', 'coverage-istanbul'],
        singleRun,
        webpack: webpackConfig,
    });
};
