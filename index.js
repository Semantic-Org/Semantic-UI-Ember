/* jshint node: true */
'use strict';

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    var options = (app && app.options.semanticUIOptions) || {};

    if(!options['skipCSS']){
      app.import({
        development: 'bower_components/semantic-ui/dist/semantic.css',
        production: 'bower_components/semantic-ui/dist/semantic.min.css'
      });
    };

    app.import({
      development: 'bower_components/semantic-ui/dist/semantic.js',
      production: 'bower_components/semantic-ui/dist/semantic.min.js'
    });

    var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff','.woff2'];
    for (var i = fontExtensions.length - 1; i >= 0; i--) {
      app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons'+fontExtensions[i], { destDir: 'assets/themes/default/assets/fonts' });
    };
  }
};
