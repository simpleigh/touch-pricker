module.exports = function(config) {
    config.set({
        autoWatch: false,
        browsers: ['Chrome', 'Firefox', 'IE', 'PhantomJS'],
        files: [
            'build/*.js',
            'tests/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        singleRun: true
    });
};
