/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

module.exports = (config) => {
    config.set({
        autoWatch: false,
        browsers: ['Chrome', 'Edge', 'Firefox', 'IE', 'PhantomJS'],
        files: [
            'dist/touch-pricker.js',
            'dist/tests.js'
        ],
        frameworks: ['jasmine'],
        singleRun: true
    });
};
