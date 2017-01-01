/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

module.exports = function(config) {
    config.set({
        autoWatch: false,
        browsers: ['Chrome', 'Firefox', 'IE', 'PhantomJS'],
        files: [
            'build/stedman-pricker.js',
            'build/tests.js'
        ],
        frameworks: ['jasmine'],
        singleRun: true
    });
};
