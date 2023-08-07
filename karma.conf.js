/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

'use strict';

const { paths, webpackTestConfig } = require('./config');

// Remove the entry
delete webpackTestConfig.entry;

// Remove the output filename (let karma-webpack put this in itself)
delete webpackTestConfig.output.filename;

module.exports = (config) => {
    config.set({
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'jsdom'],
        coverageIstanbulReporter: {
            combineBrowserReports: true,
            dir: paths.coveragePath,
            fixWebpackSourcePaths: true,
            reports: ['html', 'lcovonly', 'text-summary'],
        },
        files: [paths.testsEntryFile],
        frameworks: ['jasmine', 'webpack'],
        preprocessors: {
            [paths.testsEntryFile]: ['webpack'],
        },
        reporters: ['progress', 'coverage-istanbul'],
        webpack: webpackTestConfig,
    });
};
