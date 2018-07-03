/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/*global: require*/

'use strict';

const del = require('del');
const gulp = require('gulp');
const karma = require('karma');
const merge = require('merge2');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');

gulp.task('default', ['test']);

gulp.task('build', () => {
    const dev = gulp.src('src/index.ts')
        .pipe(gulpWebpack(require('./config/webpack.dev'), webpack));

    const prod = gulp.src('src/index.ts')
        .pipe(gulpWebpack(require('./config/webpack.prod'), webpack));

    return merge([dev, prod])
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-tests', ['build'], () => {
    const specs = gulp.src(['tests/**/*.ts'])
        .pipe(plugins.tslint({formatter: 'verbose'}))
        .pipe(plugins.tslint.report({summarizeFailureOutput: true}));

    const declarations = gulp.src('dist/touch-pricker.d.ts');

    const tsResult = merge([specs, declarations])
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
    gulp.watch(['src/**/*.ts', 'src/_templates/**/*.dot'], ['default']);
    gulp.watch('tests/**/*.ts', ['test']);
});

gulp.task('clean', () => {
    del('dist');
});
