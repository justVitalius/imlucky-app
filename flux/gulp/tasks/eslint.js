var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    config = require('../config');

gulp.task('lint:eslint', function () {
  // Note: To have the process exit with an error code (1) on
  //  lint error, return the stream and pipe to failOnError last.
  return gulp.src([config.js.srcDir+'/**/*.js'])
    .pipe(eslint({configFile: './gulp/eslint.json'}))
    // .pipe(eslint.formatEach('eslint-stylish', process.stderr))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});