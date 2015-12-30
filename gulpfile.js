/*global: require*/

var del = require('del'),
    gulp = require('gulp'),
    karma = require('karma'),
    path = require('path'),
    plugins = require('gulp-load-plugins')(),
    tsProject = plugins.typescript.createProject('tsconfig.json', {
        sortOutput: true
    });

gulp.task('default', ['scripts', 'tests']);

gulp.task('scripts', function () {
    'use strict';
    var tsResult = tsProject.src()
        .pipe(plugins.tslint())
        .pipe(plugins.tslint.report('verbose', {
            emitError: false,
            summarizeFailureOutput: true
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject));

    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.minify())
        .pipe(gulp.dest('build'));
});

gulp.task('tests', ['scripts'], function (done) {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        autoWatch: false,
        singleRun: true
    }, done).start();
});

gulp.task('tests-ie', ['scripts'], function (done) {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        browsers: ['IE'],
        autoWatch: false,
        singleRun: true
    }, done).start();
});

gulp.task('watch', ['default'], function () {
    'use strict';
    gulp.watch('src/**/*.ts', ['default']);
    gulp.watch('tests/**/*.spec.js', ['tests']);
});

gulp.task('clean', function () {
    'use strict';
    del('build');
});
