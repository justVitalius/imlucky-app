//
// Main configs for tasks in tasks folder
//
//

var srcDir = "./assets/",// destinations of frontend source code, like sass, js, coffee files
    tempDir = "./build/temp/",// temp destinations of compiled files, when sass, js, coffee converted in app.js and app.css
    publicDir = "./public/",// final destinatons of compiled files and fonts with images
    publicPath = "/static/"; // absolute path-prefix for all assets on rendered htmls


module.exports = {
  global: {
    srcDir: srcDir,
    buildDir: tempDir,
    publicDir: publicDir,
    publicPath: publicPath
  },

  js:{
    manifest: 'app.js',
    vendor: 'vendor.js',
    publicDir: publicDir,
    srcDir: srcDir + '/javascripts',
    globals: {
      "jquery": ["$", "jQuery"],
      "angular": "angular",
      "angular-translate": "angular-translate",
      "ngstorage": "ngstorage",
      "underscore": "_"
    }
  },

  css:{
    manifest: 'app.css',
    publicDir: publicDir,
    srcDir: srcDir + '/stylesheets'
  },

  font:{
    publicDir: publicDir+'/fonts'
  },

  image:{
    publicDir: publicDir+'/images'
  }

};