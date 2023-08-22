/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Useful paths for use during builds.
 */

'use strict';

const path = require('path');

/**
 * Repository root directory
 */
const rootDir = path.resolve(__dirname, '..');

/**
 * Data tables
 */
const dataDir = path.join(rootDir, 'data');

/**
 * Built resources for distribution
 */
const distDir = path.join(rootDir, 'dist');

/**
 * Examples
 */
const examplesDir = path.join(rootDir, 'examples');

/**
 * Source code
 */
const srcDir = path.join(rootDir, 'src');

/**
 * Test scaffolding
 */
const testsDir = path.join(rootDir, 'tests');

/* eslint-disable sort-keys */
module.exports = {
    // Paths to directories
    rootDir,
    dataDir,
    distDir,
    examplesDir,
    srcDir,
    testsDir,

    // Paths to source resources
    bannerFile: path.join(rootDir, 'banner.js'),
    srcEntryFile: path.join(srcDir, 'index.ts'),
    testsEntryFile: path.join(testsDir, 'index.spec.js'),

    // Paths to target resources
    devDistFile: path.join(distDir, 'touch-pricker.js'),
    prodDistFile: path.join(distDir, 'touch-pricker.min.js'),
    prodMapFile: path.join(distDir, 'touch-pricker.min.js.map'),
    testDistFile: path.join(distDir, 'touch-pricker.spec.js'),
    docsPath: path.join(rootDir, 'docs'),
};
