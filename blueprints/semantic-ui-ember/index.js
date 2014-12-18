/* globals module */

module.exports = {
  afterInstall: function () {
    return this.addBowerPackageToProject('semantic-ui');
  },

  normalizeEntityName: function () {}
};
