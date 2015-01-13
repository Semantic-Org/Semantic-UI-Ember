/* globals module */

module.exports = {
  afterInstall: function () {
    return this.addBowerPackageToProject('semantic-ui', '<=0.19.3');
  },

  normalizeEntityName: function () {}
};
