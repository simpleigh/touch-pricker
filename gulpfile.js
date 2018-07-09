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
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');

gulp.task('default', ['test']);

gulp.task('build', () => {
    const dev = gulp.src('src/index.ts')
        .pipe(gulpWebpack(require('./config/webpack.config.dev'), webpack));

    const prod = gulp.src('src/index.ts')
        .pipe(gulpWebpack(require('./config/webpack.config.prod'), webpack));

    return merge([dev, prod])
        .pipe(gulp.dest('dist/'));
});

gulp.task('build-tests', () =>
    gulp.src('tests/index.spec.js')
        .pipe(gulpWebpack(require('./config/webpack.config.test'), webpack))
        .pipe(gulp.dest('dist/'))
);

gulp.task('test', ['build'], (done) => {
    new karma.Server({
        configFile: path.join(__dirname, 'karma.conf.js'),
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test-browsers', ['build'], (done) => {
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
