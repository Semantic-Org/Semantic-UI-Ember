/* jshint node: true */
'use strict';

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    app.import({
      development: 'bower_components/semantic-ui/build/packaged/css/semantic.css',
      production:  'bower_components/semantic-ui/build/packaged/css/semantic.min.css'
    });

    app.import({
      development: 'bower_components/semantic-ui/build/packaged/javascript/semantic.js',
      production:  'bower_components/semantic-ui/build/packaged/javascript/semantic.min.js'
    });


    var fontExtensions = ['.eot','.otf','.svg','.ttf','.woff'];
    for (var i = fontExtensions.length - 1; i >= 0; i--) {
      app.import('bower_components/semantic-ui/build/packaged/fonts/icons'+fontExtensions[i], { destDir: 'fonts' });
      if (fontExtensions[i] !== '.otf') {
        app.import('bower_components/semantic-ui/build/packaged/fonts/basic.icons'+fontExtensions[i], { destDir: 'fonts' });
      }
    };
  }
};
