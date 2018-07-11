/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/*global: require*/

'use strict';

const gulp = require('gulp');
const merge = require('merge2');
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
