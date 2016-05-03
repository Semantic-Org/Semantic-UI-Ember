import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'popup',

  didUpdate() {
    this._super(...arguments);
    this.initializeModule();
  }
});
