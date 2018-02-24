/* eslint-env node */
const config = require ('../../config/environment')()
const EOL = require('os').EOL;

module.exports = {
  description: 'Installs user-customisable version of semantic-ui',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }
  normalizeEntityName() {},
  async afterInstall(options) {
    await this.removePackageFromProject('semantic-ui-css')
    await this.insertIntoFile(
      'ember-cli-build.js',
      `
  app.import('vendor/semantic/semantic.css')

        `,
      {
        before: `return app.toTree();`
      }
    )
    await this.insertIntoFile(
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
    )
    await this.insertIntoFile('.gitignore',
      `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
        `
    )
    await this.addPackageToProject('semantic-ui', config.SEMANTIC_UI_VERSION)
  }
};
