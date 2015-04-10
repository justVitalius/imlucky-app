'use strict';

var gulp    = require('gulp'),
    server  = require('gulp-express'),
    runSequence = require('run-sequence').use(gulp),
    config      = require('./gulp/config');



gulp.task('server', ['default'], function () {
  // Start the server at the beginning of the task
  server.run({
    file: './gulp/server.js',
    env: 'dev'
  });


  gulp.watch(['./gulp/server.js', 'routes/**/*.js'], [server.run.bind(null, {file: './gulp/server.js', env: 'dev'})]);



  gulp.watch([config.global.srcDir+'/stylesheets/**/*'], ['styles:compile']);
  gulp.watch([config.global.buildDir+'/'+config.css.manifest], ['assets:copy']);

  gulp.watch([config.global.srcDir+'/javascripts/**/*.js'], ['scripts:compile']);
  gulp.watch([config.global.buildDir+'/'+config.js.manifest], ['assets:copy']);


});


//
// default task will build all frontend requires
gulp.task('default', function(cb) {
  runSequence(['scripts:compile', 'styles:compile', 'images:copy', 'fonts:copy'], 'assets:copy', cb);
});


// Require all tasks in gulp/tasks, including subfolders
var requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });

// ==================================
// Old tasks to work with runSequence
// maybe it will worked best with gulp watchers
//
//gulp.watch([config.global.srcDir+'/stylesheets/**/*'], function(){
//  runSequence('styles:compile', 'assets:copy');
//});
//
//gulp.watch([config.global.buildDir+'/'+config.css.manifest], function(){
//  runSequence('styles:compile', 'assets:copy');
//});
//
//gulp.watch([config.global.srcDir+'/javascripts/**/*.js'], function(){
//  runSequence('scripts:compile', 'assets:copy');
//});
// ==================================