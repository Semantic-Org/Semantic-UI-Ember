/* jshint node: true */
'use strict';

var path = require('path');

var defaults = {
  import: {
    css: true,
    javascript: true,
    images: true,
    fonts: true
  },
  source: {
    css: 'bower_components/semantic-ui/dist',
    javascript: 'bower_components/semantic-ui/dist',
    images: 'bower_components/semantic-ui/dist/themes/default/assets/images',
    fonts: 'bower_components/semantic-ui/dist/themes/default/assets/fonts'
  },
  destination: {
    images: 'assets/themes/default/assets/images',
    fonts: 'assets/themes/default/assets/fonts'
  }
};

var getDefault = require('./lib/utils/get-default');

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    var options = (app && app.project.config(app.env)['SemanticUI']) || {};

    var importCss = getDefault('import', 'css', [options, defaults]);
    if (importCss) {
      var sourceCss = getDefault('source', 'css', [options, defaults]);
      app.import({
        development: path.join(sourceCss, 'semantic.css'),
        production: path.join(sourceCss, 'semantic.min.css')
      });
    }

    var importJavascript = getDefault('import', 'javascript', [options, defaults]);
    if (importJavascript) {
      var sourceJavascript = getDefault('source', 'javascript', [options, defaults]);
      app.import({
        development: path.join(sourceJavascript, 'semantic.js'),
        production: path.join(sourceJavascript, 'semantic.min.js')
      });
    }

    var importImages = getDefault('import', 'images', [options, defaults]);
    if (importImages) {
      var sourceImage = getDefault('source', 'images', [options, defaults]);
      var imageOptions = { destDir: getDefault('destination', 'images', [options, defaults]) };
      app.import(path.join(sourceImage, 'flags.png'), imageOptions);
    }

    var importFonts = getDefault('import', 'fonts', [options, defaults]);
    if (importFonts) {
      var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff','.woff2'];
      var sourceFont = getDefault('source', 'fonts', [options, defaults]);
      var fontOptions = { destDir: getDefault('destination', 'fonts', [options, defaults]) };
      for (var i = fontExtensions.length - 1; i >= 0; i--) {
        app.import(path.join(sourceFont, 'icons' + fontExtensions[i]), fontOptions);
      }
    }
  }
};
