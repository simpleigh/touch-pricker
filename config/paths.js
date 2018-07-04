const path = require('path');

/**
 * Repository root directory
 */
const rootDir = path.resolve(__dirname, '..');

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

module.exports = {
    // Paths to directories
    rootDir,
    distDir,
    examplesDir,
    srcDir,
    testsDir,

    // Paths to particular resources
    bannerFile: path.join(rootDir, 'banner.js'),
    srcEntryFile: path.join(srcDir, 'index.ts'),
    testsEntryFile: path.join(testsDir, 'index.spec.js'),
};
