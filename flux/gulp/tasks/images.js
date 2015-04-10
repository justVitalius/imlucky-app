//
// Move images to public folder
'use strict';


var gulp    = require('gulp'),
    config  = require('../config');


var copyImages = function(glob){
  gulp.src(glob)
    .pipe(gulp.dest(config.image.publicDir));
};

var generateGlob = function(srcDir, extensions){
  var glob = [];

  if (srcDir && !!extensions && extensions.length) {
    extensions.forEach(function (extension) {
      glob.push(srcDir + '/**/*.' + extension);
    });
  }

  return glob;
};

gulp.task('images:developers', function(){
  var srcDir = config.global.srcDir+'/images',
      glob = [],
      extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'];

  glob = generateGlob(srcDir, extensions);
  copyImages(glob);
});

gulp.task('images:bower', function(){
  var srcDir = config.global.srcDir+'/components',
    glob = [],
    extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp'];

  glob = generateGlob(srcDir, extensions);
  copyImages(glob);
});

gulp.task('images:copy', ['images:developers', 'images:bower']);