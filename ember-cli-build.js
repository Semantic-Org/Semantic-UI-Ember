/* eslint-env node */

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
    // Add options here
    'ember-cli-babel': {
      includePolyfill: false
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // Import Highlight.js
  app.import("node_modules/highlightjs/highlight.pack.min.js");

  app.import("node_modules/highlightjs/styles/github-gist.css");
  app.import("node_modules/highlightjs/styles/hybrid.css");


  return app.toTree();
};
