/*global: require*/

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    tsProject = plugins.typescript.createProject('tsconfig.json', {
        sortOutput: true
    });

gulp.task('default', ['scripts']);

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

gulp.task('watch', ['default'], function () {
    'use strict';
    gulp.watch('src/**/*.ts', ['default']);
});
