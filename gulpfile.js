/*global: require*/

var del = require('del'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['build', 'test']);

gulp.task('build', function () {
    'use strict';
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(plugins.tslint())
        .pipe(plugins.tslint.report('verbose', {
            emitError: false,
            summarizeFailureOutput: true
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript({
            declaration: true,
            newLine: 'LF',
            sortOutput: true
        }));

    return merge([
        tsResult.js
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.minify())
            .pipe(gulp.dest('build')),
        tsResult.dts.pipe(gulp.dest('build'))
    ]);
});

gulp.task('build-tests', ['build'], function () {
    'use strict';
    return gulp.src('tests/**/*.ts')
        .pipe(plugins.typescript())
        .pipe(gulp.dest('build/tests'));
});

gulp.task('test', ['build', 'build-tests'], function (done) {
    'use strict';
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test-browsers', ['build', 'build-tests'], function (done) {
    'use strict';
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, done).start();
});

gulp.task('watch', ['default'], function () {
    'use strict';
    gulp.watch('src/**/*.ts', ['default']);
    gulp.watch('tests/**/*.spec.js', ['test']);
});

gulp.task('clean', function () {
    'use strict';
    del('build');
});
