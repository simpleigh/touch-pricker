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
