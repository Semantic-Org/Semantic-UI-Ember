/* eslint-env node */
const config = require ('../../config/environment')()
const EOL = require('os').EOL;

module.exports = {
  description: 'Installs user-customisable version of semantic-ui',

  normalizeEntityName() {},
  async afterInstall(options) {
    this.ui.write('Removing semantic-ui-css')
    await this.removePackageFromProject('semantic-ui-css')
    this.ui.write('Adding semantic-ui custom folder to .gitignore')
    await this.insertIntoFile('.gitignore',
      `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
        `
    )
    this.ui.write('Installing semantic-ui')
    await this.addPackageToProject('semantic-ui', config.SEMANTIC_UI_VERSION)
  }
};
