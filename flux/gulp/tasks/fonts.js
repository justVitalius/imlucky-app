//
// Move fonts to public folder
'use strict';

var gulp    = require('gulp'),
    config  = require('../config');


var copyFonts = function(glob){
  gulp.src(glob)
    .pipe(gulp.dest(config.font.publicDir));
};

gulp.task('fonts:bootstrap', function(){
  var glob = [
    config.global.srcDir+'/components/bootstrap-sass-official/assets/fonts/**/*'
  ];

  copyFonts(glob);
});


gulp.task('fonts:fontawesome', function(){
  var glob= [
    config.global.srcDir+'/components/fontawesome/fonts/*.otf',
    config.global.srcDir+'/components/fontawesome/fonts/*.eot',
    config.global.srcDir+'/components/fontawesome/fonts/*.svg',
    config.global.srcDir+'/components/fontawesome/fonts/*.ttf',
    config.global.srcDir+'/components/fontawesome/fonts/*.woff'
    ];

  copyFonts(glob);
});


gulp.task('fonts:copy', ['fonts:bootstrap', 'fonts:fontawesome']);