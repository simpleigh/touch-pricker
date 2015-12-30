var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    var tsResult = tsProject.src()
        .pipe(tslint())
        .pipe(tslint.report('verbose', {
            emitError: false,
            summarizeFailureOutput: true
        }))
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('src'));
});
