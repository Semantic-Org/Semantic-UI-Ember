/* jshint node: true */
'use strict';

var defaults = {
  imports: {
    css: true,
    javascript: true,
    fonts: true,
    images: true,
  },
  paths: {
    theme: 'default',
    source: 'bower_components/semantic-ui/dist',
  }
};

var generation = require('./utils/generation');

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    var options = (app && app.options['SemanticUI']) || {};
    var path = generation.default('paths', 'source', [options, defaults]);
    var theme = generation.default('paths', 'theme', [options, defaults]);
    var css = generation.default('imports', 'css', [options, defaults]);
    var javascript = generation.default('imports', 'javascript', [options, defaults]);
    var fonts = generation.default('imports', 'fonts', [options, defaults]);
    var images = generation.default('imports', 'images', [options, defaults]);

    if (css) {
      app.import({
        development: generation.format(path, 'semantic.css'),
        production: generation.format(path, 'semantic.min.css')
      });
    }

    if (javascript) {
      app.import({
        development: generation.format(path, 'semantic.js'),
        production: generation.format(path, 'semantic.min.js')
      });
    }

    if (images) {
      var imageOptions = { destDir: generation.format(path, theme, 'assets/images')};
      app.import(generation.format(path, 'themes', theme, 'assets/images/flags.png'), imageOptions);
    }

    if (fonts) {
      var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff','.woff2'];
      var fontOptions = { destDir: 'assets/fonts' };
      for (var i = fontExtensions.length - 1; i >= 0; i--) {
        app.import(generation.format(path, 'themes', theme, 'assets/fonts/icons')+fontExtensions[i], fontOptions);
      }
    }
  }
};
