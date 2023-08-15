/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

'use strict';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/test*.ts'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.dot$': './dotTransformer.js',
        '^.+\\.ts$': 'ts-jest',
    },
};
