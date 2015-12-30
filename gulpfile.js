var gulp = require('gulp'),
    path = require('path'),
    shell = require('gulp-shell');

gulp.task('default', shell.task(path.join('bin', 'tsc')));
