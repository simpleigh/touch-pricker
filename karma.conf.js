module.exports = function(config) {
    config.set({
        browsers: ['Chrome', 'Firefox', 'PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'build/*.js',
            'tests/**/*.spec.js'
        ]
    })
}
