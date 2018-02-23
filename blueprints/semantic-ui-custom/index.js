/* eslint-env node */
import config from './config/environment'
const EOL = require('os').EOL;

module.exports = {
  description: 'Installs user-customisable version of semantic-ui',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall(options) {
    this.removePackageFromProject('semantic-ui-css')
      .then(() => this.insertIntoFile(
        'ember-cli-build.js',
        `
          app.import('vendor/semantic/semantic.css')
        `,
        {
          before: `return app.toTree();`
        }
      ))
      .then(() => this.insertIntoFile(
        'ember-cli-build.js',
        `
    SemanticUI: {
      source: {
        css: 'vendor/semantic',
        javascript: 'vendor/semantic'
      }
    }
    `,  {
          after: `new EmberApp(defaults, {` + EOL
        }
      ))
      .then(() => this.insertIntoFile(
        '.gitignore',
        `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
        `
      ))
      .then(() => this.addPackageToProject('semantic-ui', config.SEMANTIC_UI_VERSION))
  }
};
