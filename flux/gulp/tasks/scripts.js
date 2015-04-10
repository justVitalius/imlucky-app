'use strict';
//
// Task for generate app.js
//
var gulp        = require('gulp'),
    debowerify  = require('debowerify'),
    exposify    = require('exposify'),
    browserify  = require('browserify'),
    coffeeify    = require('coffeeify'),
    source      = require('vinyl-source-stream'),
    glob        = require('glob'),
    plumber     = require('gulp-plumber'),
    concat      = require('gulp-concat'),
    bower       = require('main-bower-files');

var config      = require('../config');


var buildDependenciesFolder = config.global.buildDir + '/vendor_dependencies';

gulp.task('scripts:collectVendors', function(){

  var vendorNames, files= [],
      bowerJsonPath = './' + config.global.srcDir + '/bower.json',
      bowerrcPath = './' + config.global.srcDir + '/.bowerrc';

  // all globals modules will become vendors scripts
  vendorNames = Object.keys(config.js.globals);
  vendorNames.forEach(function(name){
    var regexp = new RegExp(name);
    files.push(bower({
      filter: regexp,
      paths: {
        bowerJson: bowerJsonPath,
        bowerrc: bowerrcPath
      }
    }));
  });

  // do flatten array from array-of-array
  files = [].concat.apply([], files);
  // move vendor files to
  return gulp.src(files, {base: config.global.srcDir + '/components/'})
    .pipe(plumber())
    .pipe(gulp.dest(buildDependenciesFolder));
});


gulp.task('scripts:compileVendors', ['scripts:collectVendors'], function(){
  var filesMask = buildDependenciesFolder+'/**/*.js';
  return gulp.src(filesMask)
    .pipe(plumber())
    .pipe(concat(config.js.vendor))
    .pipe(gulp.dest(config.global.buildDir));

});


gulp.task('scripts:compileApp', function(){

  // prepare Browserify and dependencies files
  // var fileName = glob.sync(config.global.srcDir+'/javascripts/'+config.js.manifest)[0];

  var browserified = function(file){
    exposify.config = config.js.globals;
    var fileNames = glob.sync(config.global.srcDir+'/javascripts/'+config.js.manifest);
    var _browserify =  browserify({
      entries: fileNames,
      //entries: file,
      extensions: ['.js', '.coffee'],
      paths: [
        config.global.srcDir+'/javascripts',
        config.global.srcDir+'/components',
        './node_modules/'
      ]
    });


    return _browserify
      .transform(coffeeify)
      .transform(debowerify)
      .transform(exposify)
      //.exclude('./assets/components/underscore/underscore.js')
      .bundle();
  };


  return browserified()
    //return browserified()
    .pipe(source(config.js.manifest))
    .pipe(plumber())
    .pipe(gulp.dest(config.global.buildDir));

});


gulp.task('scripts:compile', ['scripts:compileVendors', 'scripts:compileApp']);

// Other non-using old code
//gulp.task('scripts:concat', function(){
//  var fileNames = glob.sync(config.global.srcDir+'/javascripts/**/*.js');
//  gulp.src(fileNames)
//    .pipe(concat(config.js.manifest))
//    .pipe(gulp.dest(config.global.buildDir));
//});
//
//    // require own modules
//console.log(fileNames);
//fileNames.forEach(function(name){
//  _browserify = _browserify.add(name);
//});
//
//
//exclude bower components from browserified manifest file
//bower().forEach(function(fileName){
//  _browserify.exclude(fileName).external(fileName).external('/static/vendor.js');
//});
//
//
//var fileNames = glob.sync(config.global.srcDir+'/javascripts/**/*.js');
//gulp.src(fileNames)
//  .pipe(concat('hello.js'))
//  .pipe(gulp.dest('./build/'));
//
//exposify.config = config.js.globals;
//
//return browserify({
//  entries: config.global.buildDir+config.js.manifest,
//  paths: [config.global.srcDir+'/javascripts', config.global.srcDir+'/components']
//}).transform(debowerify)
//    .transform(exposify).bundle()
//  .pipe(source(config.js.manifest))
//  .pipe(gulp.dest(config.global.buildDir));
