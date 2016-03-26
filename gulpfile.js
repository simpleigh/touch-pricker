/*global: require*/

var del = require('del'),
    glob = require('glob'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['build', 'test', 'build-test-file']);

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
    var tsResult = gulp.src('tests/**/*.ts')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript());

    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('build/tests'));
});

gulp.task('build-test-file', ['build-tests'], function () {
    'use strict';
    return gulp.src('tests/jasmine-tpl.html')
        .pipe(plugins.template({scripts: ['build/stedman-pricker.js']
            .concat(glob.sync('build/tests/**/*.spec.js'))
        }))
        .pipe(plugins.rename('jasmine.html'))
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
    gulp.watch('tests/**/*.spec.js', ['test', 'build-test-file']);
});

gulp.task('clean', function () {
    'use strict';
    del('build');
});
