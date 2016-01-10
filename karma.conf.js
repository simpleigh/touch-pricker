module.exports = function(config) {
    config.set({
        autoWatch: false,
        browsers: ['Chrome', 'Firefox', 'IE', 'PhantomJS'],
        files: [
            'build/*.js',
            'build/tests/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        singleRun: true
    });
};
