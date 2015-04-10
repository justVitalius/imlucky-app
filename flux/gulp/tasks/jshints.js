/*
  This tasks requires several packages:
  "coffeelint-stylish": "^0.1.1",
  "gulp-jshint": "^1.9.4",
  "jshint-stylish": "^1.0.0",

 JSHint plugin needs <jshint.json> file on ./gulp folder with config like this
 {
   "undef": true,
   "unused": true,
   "predef": [ "require", "window", "console", "$", "module" ],
   "strict": true,
   "camelcase": true,
   "funcscope": true,
   "maxdepth": 2
 }

 */

//'use strict';
//
//var gulp    = require('gulp'),
//    jshint = require('gulp-jshint'),
//    cache = require('gulp-cached'),
//    jshintConfig = require('../jshint.json'),
//    coffelintConfig = require('../coffeelint.json'),
//    coffeelint = require('gulp-coffeelint'),
//    config        = require('../config');
//
//gulp.task('lint:jshint', function() {
//  return gulp.src(config.global.srcDir+'/javascripts/**/*.js')
//    .pipe(cache('scripts'))
//    .pipe(jshint(jshintConfig))
//    .pipe(jshint.reporter('jshint-stylish'))
//});
//gulp.task('lint:coffeelint', function() {
//  return gulp.src(config.global.srcDir+'/javascripts/**/*.coffee')
//    .pipe(cache('scripts'))
//    .pipe(coffeelint(coffelintConfig))
//    .pipe(coffeelint.reporter())
//});
//gulp.task('lint:watch', function(){
//  gulp.watch(config.global.srcDir+'/javascripts/**/*', ['lint:jshint', 'lint:coffeelint']);
//});