/* globals module */

module.exports = {
  afterInstall: function () {
    return this.addPackageToProject('semantic-ui');
  },

  normalizeEntityName: function () {}
};
