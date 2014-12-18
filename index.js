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
  }
};
