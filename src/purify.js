const purify = require('purify-css');
const nodeSass = require('node-sass');
const path = require('path');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

const content = ['**/+app/**/template.html'];
const includePaths = ['node_modules/foundation-sites/scss', 'node_modules/motion-ui/src'];

const critical = nodeSass.renderSync({
  file: 'src/assets/stylesheets/app.scss',
  includePaths: includePaths,
});
const deferred = nodeSass.renderSync({
  file: 'src/assets/stylesheets/deferred.scss',
  includePaths: includePaths,
});


const options = {
  basePath: __dirname,
  paths: content,
  resolveExtensions: ['.html'],
  minify: true,
  // rejected: true,
  info: true,
  whitelist: getWhitelist(),
};

purify(content, critical.css.toString(), options, function (resultCss) {
  postcss([autoprefixer({remove: false, browsers: 'last 2 versions' })]).process(resultCss).then(function (result) {
    result.warnings().forEach(function (warn) {
      console.warn(warn.toString());
    });

    fs.writeFile('src/assets/critical.css', result.css, function (err) {
      if (!err) {
        console.log('yeee, we be winners');
      } else {
        console.log('Oh Nose!');
      }
    });
  });
});

purify(content, deferred.css.toString(), options, function (resultCss) {
  postcss([autoprefixer({remove: false, browsers: 'last 2 versions' })]).process(resultCss).then(function (result) {
    result.warnings().forEach(function (warn) {
      console.warn(warn.toString());
    });

    fs.writeFile('src/assets/deferred.css', result.css, function (err) {
      if (!err) {
        console.log('yeee, we be winners');
      } else {
        console.log('Oh Nose!');
      }
    });
  });
});

function getWhitelist() {
  return [
    'tooltip',
    'foundation-mq',
    'intercom-frame*',
    'reveal-overlay',
    'map-marker',

    // Amenity icon shit. Accessed programatically
    'fa-paw',
    'fa-wheelchair-alt',
    'icon-washer-dryer-2',
    'icon-electricity',
    'icon-gas',
    'icon-tint',
    'fa-trash',
    'icon-central-air-alt',
    'fa-fire',
    'icon-smoking-allowed',
    'icon-garage-512',
    'icon-lawn-mower',
    'fa-television',
    'fa-wifi',

    // Topbar dropdown stuff
    'vertical',
    'first-sub',
    'is-dropdown-submenu-parent',
    'opens-left',
    'is-active',
    'submenu',
    'is-dropdown-submenu',
    'js-dropdown-active',
    'is-submenu-item',
    'is-dropdown-submenu-item',
  ];
}