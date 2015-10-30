import Ember from 'ember';

export default Ember.Component.extend({
  module: 'nag',
  classNames: [ 'ui', 'nag' ],
  attributeBindings: [ 'storageMethod', 'key', 'expires', 'domain', 'path', 'value' ],

  init: function() {
    this._super();
    this.execute('show');
  }
});
