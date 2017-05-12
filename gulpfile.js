/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/*global: require*/

var del = require('del'),
    gap = require('gulp-append-prepend'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['test']);

var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('build', function () {
    'use strict';
    var tsResult = tsProject.src()
            .pipe(plugins.tslint({formatter: 'verbose'}))
            .pipe(plugins.tslint.report({
                emitError: false,
                summarizeFailureOutput: true
            }))
            .pipe(plugins.sourcemaps.init())
            .pipe(tsProject()),
        templates = gulp.src('src/_templates/**/*.dot')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.dotPrecompiler({
                dictionary: 'Pricker.Templates',
                varname: 'context',
            }))
            .pipe(plugins.sourcemaps.mapSources(function(sourcePath, file) {
                // Fix source path for templates
                return 'src/_templates/' + sourcePath;
            }));

    return merge([
        merge(tsResult.js, templates)
            .pipe(plugins.concat('stedman-pricker.js'))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.minify({ext: {min: '.min.js'}}))
            .pipe(gap.prependFile('header.js'))
            .pipe(gulp.dest('./dist')),
        tsResult.dts
            .pipe(gulp.dest('.'))
    ]);
});

gulp.task('build-tests', ['build'], function () {
    'use strict';
    var specs,
        declarations,
        tsResult;

    specs = gulp.src(['tests/**/*.ts'])
        .pipe(plugins.tslint({formatter: 'verbose'}))
        .pipe(plugins.tslint.report({
            emitError: false,
            summarizeFailureOutput: true
        }));

    declarations = gulp.src('dist/stedman-pricker.d.ts');

    tsResult = merge([specs, declarations])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript({
            outFile: 'dist/tests.js'
        }));

    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('.'));
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

gulp.task('docs', function () {
    'use strict';
    tsProject.src()
        .pipe(plugins.typedoc({
            out: 'docs/',
            name: 'Free Stedman Pricker',
            mode: 'file',
        }));
});

gulp.task('clean', function () {
    'use strict';
    del('dist');
});
