/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/*global: require*/

'use strict';

var del = require('del'),
    fs = require('fs'),
    gulp = require('gulp'),
    karma = require('karma'),
    merge = require('merge2'),
    path = require('path'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['test']);

var tsProject = plugins.typescript.createProject('tsconfig.json');

gulp.task('build', () => {
    var tsResult = tsProject.src()
            .pipe(plugins.tslint({formatter: 'verbose'}))
            .pipe(plugins.tslint.report({summarizeFailureOutput: true}))
            .pipe(plugins.sourcemaps.init())
            .pipe(tsProject()),
        templates = gulp.src('src/_templates/**/*.dot')
            .pipe(plugins.dotPrecompiler({
                dictionary: 'Pricker.Templates',
                varname: 'context',
            })),
        header = fs.readFileSync('header.js', 'utf8');

    return merge([
        merge(tsResult.js, templates)
            .pipe(plugins.concat('touch-pricker.js'))
            .pipe(plugins.header(header))
            .pipe(plugins.umd({
                exports: () => 'Pricker',
                namespace: () => 'Pricker'
            }))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./dist'))
            .pipe(plugins.uglify({ output: { preamble: header } }))
            .pipe(plugins.rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./dist')),
        tsResult.dts
            .pipe(gulp.dest('.'))
    ]);
});

gulp.task('build-tests', ['build'], () => {
    var specs,
        declarations,
        tsResult;

    specs = gulp.src(['tests/**/*.ts'])
        .pipe(plugins.tslint({formatter: 'verbose'}))
        .pipe(plugins.tslint.report({summarizeFailureOutput: true}));

    declarations = gulp.src('dist/touch-pricker.d.ts');

    tsResult = merge([specs, declarations])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript({
            outFile: 'dist/tests.js'
        }));

    return tsResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('.'));
});

gulp.task('test', ['build', 'build-tests'], (done) => {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test-browsers', ['build', 'build-tests'], (done) => {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js')
    }, done).start();
});

gulp.task('watch', ['default'], () => {
    gulp.watch('src/**/*.ts', ['default']);
    gulp.watch('tests/**/*.ts', ['test']);
});

gulp.task('docs', () => {
    tsProject.src()
        .pipe(plugins.typedoc({
            out: 'docs/',
            name: 'Free Touch Pricker',
            mode: 'file',
        }));
});

gulp.task('clean', () => {
    del('dist');
});
