'use strict';
//
// Task move all compiled frontend files to destination folder
//
var gulp    = require('gulp'),
    del     = require('del'),
    vinylPaths    = require('vinyl-paths'),
    runSequence   = require('run-sequence'),
    concat        = require('gulp-concat'),
    rename        = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    config        = require('../config');



// Move vendor.js, app.js, app.css to public folder
gulp.task('assets:copy', function(){
  var app_js_path = config.global.buildDir+'/'+config.js.manifest,
      vendor_js_path = config.global.buildDir+'/'+config.js.vendor,
      css_path = config.global.buildDir+'/'+config.css.manifest;

  gulp.src([vendor_js_path, app_js_path])
      .pipe(plumber())
      .pipe(concat(config.js.manifest))
      .pipe(gulp.dest(config.js.publicDir));

  gulp.src([css_path])
    .pipe(plumber())
    .pipe(gulp.dest(config.css.publicDir));
});


// Remove temp assets from <build> folder
gulp.task('assets:removeTemp', function(){
  var filesMask = config.global.buildDir+'/**/*';

  return gulp.src([filesMask])
    .pipe(vinylPaths(del));
});


gulp.task('assets:move', function(cb){
  return runSequence('assets:copy', 'assets:removeTemp', cb);
});


gulp.task('assets:css:minify', function(){
  return gulp.src(config.css.publicDir+'/'+config.css.manifest)
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss({keepSpecialComments: 0}))
    .pipe(gulp.dest(config.css.publicDir));
});


gulp.task('assets:js:minify', function(){
  return gulp.src(config.css.publicDir+'/'+config.js.manifest)
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.js.publicDir));
});
