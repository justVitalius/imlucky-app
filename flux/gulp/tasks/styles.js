//
// Create 'app.css' file with all imported styles
var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    concat  = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    config  = require('../config');

gulp.task('styles:compile', function(){
  var manifestPath = config.global.srcDir+'/stylesheets/**/*.manifest.scss',
      includePaths = [
        config.global.srcDir+'/stylesheets',
        config.global.srcDir+'/components/bootstrap-sass-official/assets/stylesheets',
        config.global.srcDir+'/components/fontawesome/scss'
      ],
      publicDir = config.global.publicDir + '/images';


  gulp.src(manifestPath)
    .pipe(plumber())
    .pipe(sass({
      includePaths: includePaths,
      imagePath: config.global.publicPath,
      debugInfo: 'normal'
    }))
    .pipe(concat(config.css.manifest))
    .pipe(rename(config.css.manifest))
    .pipe(gulp.dest(config.global.buildDir));
});
