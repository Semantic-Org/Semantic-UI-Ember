/* jshint node: true */
'use strict';

module.exports = {
  name: 'semantic-ui-ember',

  included: function (app) {
    app.import({
      development: 'bower_components/semantic-ui/dist/semantic.css',
      production: 'bower_components/semantic-ui/dist/semantic.min.css'
    });

    app.import({
      development: 'bower_components/semantic-ui/dist/semantic.js',
      production: 'bower_components/semantic-ui/dist/semantic.min.js'
    });

    app.import('bower_components/semantic-ui/dist/themes/basic/assets/fonts/icons.eot', { destDir: 'assets/themes/basic/assets/fonts' });
    // omitted absent .otf font file for basic theme
    app.import('bower_components/semantic-ui/dist/themes/basic/assets/fonts/icons.svg', { destDir: 'assets/themes/basic/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/basic/assets/fonts/icons.ttf', { destDir: 'assets/themes/basic/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/basic/assets/fonts/icons.woff', { destDir: 'assets/themes/basic/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.eot', { destDir: 'assets/themes/default/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.otf', { destDir: 'assets/themes/default/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.svg', { destDir: 'assets/themes/default/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.ttf', { destDir: 'assets/themes/default/assets/fonts' });
    app.import('bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.woff', { destDir: 'assets/themes/default/assets/fonts' });
  }
};
