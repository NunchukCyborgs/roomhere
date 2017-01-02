const glob = require('glob');
const compiles = require('./sass-to-css');
const files = glob.sync('src/+app/**/*.scss');
files.forEach(function (path) {
  compiles(path);
})