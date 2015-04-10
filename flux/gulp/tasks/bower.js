'use strict';

var gulp = require('gulp'),
    bower = require('gulp-bower'),
    config = require('../config');

gulp.task('bower:install', function() {
  return bower({
    cwd: config.global.srcDir,
    cmd: 'install'
  })
});