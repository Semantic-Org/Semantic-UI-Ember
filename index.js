/* jshint node: true */
'use strict';

var defaults = {
  css: true,
  javascript: true,
  fonts: true,
  images: true
};

const getWithDefault = function(property, default_property) {
  if (property === null || property === undefined) {
    return default_property;
  }

  return property;
};

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    var options = (app && app.options['SemanticUI']) || {};

    if (getWithDefault(options['css'], defaults['css'])) {
      app.import({
        development: 'bower_components/semantic-ui/dist/semantic.css',
        production: 'bower_components/semantic-ui/dist/semantic.min.css'
      });
    }

    if (getWithDefault(options['javascript'], defaults['javascript'])) {
      app.import({
        development: 'bower_components/semantic-ui/dist/semantic.js',
        production: 'bower_components/semantic-ui/dist/semantic.min.js'
      });
    } else {

    }

    if (getWithDefault(options['images'], defaults['images'])) {
      var imageOptions = { destDir: 'assets/themes/default/assets/images' };
      app.import('bower_components/semantic-ui/dist/themes/default/assets/images/flags.png', imageOptions);
    }

    if (getWithDefault(options['fonts'], defaults['fonts'])) {
      var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff','.woff2'];
      var fontOptions = { destDir: 'assets/themes/default/assets/fonts' };
      for (var i = fontExtensions.length - 1; i >= 0; i--) {
        app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons'+fontExtensions[i], fontOptions);
      };
    }
  }
};
