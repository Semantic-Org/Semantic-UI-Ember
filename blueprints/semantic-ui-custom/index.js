/* eslint-env node */
const config = require('../../config/environment')()
const EOL = require('os').EOL

module.exports = {
  description: 'Installs user-customisable version of semantic-ui',

  normalizeEntityName() {
  },
  afterInstall(options) {
    this.ui.writeLine('Removing semantic-ui-css')
    return this.removePackageFromProject('semantic-ui-css')
      .then(() => {
        this.ui.writeLine('Adding semantic-ui custom folder to .gitignore')
        return this.insertIntoFile('.gitignore', `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
`
      )
    }).then(() => {

      this.ui.writeLine('Installing semantic-ui')
      return this.addPackageToProject('semantic-ui', config.SEMANTIC_UI_VERSION)

    })

  }
}
