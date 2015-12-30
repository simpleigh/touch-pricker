var gulp = require('gulp'),
    path = require('path'),
    shell = require('gulp-shell'),
    tslint = require('gulp-tslint');

gulp.task('default', shell.task(path.join('bin', 'tsc')));

gulp.task('tslint', function () {
    gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: false,
            summarizeFailureOutput: true
        }));
});

gulp.task('watch', shell.task(path.join('bin', 'tsc') + ' --watch'));
