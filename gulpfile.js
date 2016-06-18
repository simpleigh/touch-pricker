/*global: require*/

var del = require('del'),
    glob = require('glob'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['test']);

gulp.task('build', function () {
    'use strict';
    var tsProject = plugins.typescript.createProject('tsconfig.json', {
            sortOutput: true,
            typescript: require('typescript')
        }),
        tsResult = tsProject.src()
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report('verbose', {
                emitError: false,
                summarizeFailureOutput: true
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript(tsProject));

    return merge([
        tsResult.js
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.minify())
            .pipe(gulp.dest('build')),
        tsResult.dts
            .pipe(gulp.dest('build'))
    ]);
});

gulp.task('build-tests', function () {
    'use strict';
    var tsResult = gulp.src('tests/**/*.ts')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript());

    return tsResult.js
        .pipe(plugins.concat('tests.js'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('build'));
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
    gulp.watch('tests/**/*.ts', ['test']);
});

gulp.task('clean', function () {
    'use strict';
    del('build');
});
