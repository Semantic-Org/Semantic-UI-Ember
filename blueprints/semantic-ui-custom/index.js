/* eslint-env node */
const config = require('../../config/environment')()
const EOL = require('os').EOL

module.exports = {
  description: 'Installs user-customisable version of semantic-ui',

  normalizeEntityName() {
  },
  afterInstall(options) {
    return this.removePackageFromProject('semantic-ui-css')
      .then( () => {
        this.ui.write('Removed semantic-ui-css')
    }).then( () => {

      this.ui.write('Adding semantic-ui custom folder to .gitignore')

      return this.insertIntoFile('.gitignore',
        `
/semantic/*
!/semantic/src/site/*
!/semantic/src/theme.config
        `
      )

    }).then(function () {

      this.ui.write('Installing semantic-ui')
      return this.addPackageToProject('semantic-ui', config.SEMANTIC_UI_VERSION)

    })

  }
}
