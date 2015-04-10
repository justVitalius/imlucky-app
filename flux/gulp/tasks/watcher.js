(function(){
  "use strict";

  var gulp    = require("gulp"),
      config  = require("../config");

    gulp.task("watcher:all", ["default"], function () {
      gulp.watch([config.css.srcDir+"/**/*"], ["styles:compile"]);
      gulp.watch([config.global.buildDir+"/"+config.css.manifest], ["assets:copy"]);

      gulp.watch([config.js.srcDir + "/**/*.js"], ["scripts:compile", "lint:eslint"]);
      gulp.watch([config.global.buildDir+"/"+config.js.manifest], ["assets:copy"]);
  });
})();
