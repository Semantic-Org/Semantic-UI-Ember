import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'nag',
  classNames: [ 'ui', 'nag' ],
  attributeBindings: [ 'storageMethod', 'key', 'expires', 'domain', 'path', 'value' ],

  didInsertElement: function() {
    this._super(...arguments);
    this.execute('show');
  }
});
