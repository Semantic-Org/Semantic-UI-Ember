/* jshint node:true */

var runCommand = require('ember-addon-genie/lib/utils/run-command');

module.exports = {
  init: function() {
    this._previousVersion = require('../package.json').version;
  },

  afterPush: function(project, tags) {
    runCommand('ember genie:changelog --write=true --version=' + this._previousVersion +
        ' --new-version=' + tags.next, true);
  },
  afterPublish: function(project, versions) {
    runCommand('ember github-pages:commit --message "Released ' + versions.next + '"', true);
    runCommand('git push origin gh-pages:gh-pages', true);
  },
  publish: true
};
