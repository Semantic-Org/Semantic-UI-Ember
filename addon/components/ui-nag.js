import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  moduleName: 'nag',
  classNames: [ 'ui', 'nag' ],
  attributeBindings: [ 'storageMethod', 'key', 'expires', 'domain', 'path', 'value' ],

  didInsertElement() {
    this._super();
    this.execute('show');
  }
});
