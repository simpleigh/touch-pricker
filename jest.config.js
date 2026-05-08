/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

/**
 * Configuration for Jest
 * @see https://jestjs.io/docs/configuration
 */

'use strict';

/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    // An array of glob patterns indicating a set of files for which coverage
    // information should be collected.
    // @see https://jestjs.io/docs/configuration/#collectcoveragefrom-array
    collectCoverageFrom: ['src/**/*.ts', '!src/**/test*.ts'],

    // A list of paths to modules that run some code to configure or set up the
    // testing framework before each test file in the suite is executed.
    // @see https://jestjs.io/docs/configuration/#setupfilesafterenv-array
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],

    // The test environment that will be used for testing.
    // @see https://jestjs.io/docs/configuration/#testenvironment-string
    testEnvironment: 'jsdom',

    // A map from regular expressions to paths to transformers.
    // @see https://jestjs.io/docs/configuration/#transform-objectstring-pathtotransformer--pathtotransformer-object
    transform: {
        '^.+\\.dot$': './dotTransformer.js',
        '^.+\\.ts$': 'ts-jest',
    },
};
