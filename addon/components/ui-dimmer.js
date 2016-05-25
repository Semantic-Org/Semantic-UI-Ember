import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'dimmer',
  ignorableAttrs: ['onElement'],

  getSemanticScope() {
    if (Ember.isPresent(this.get('onElement'))) {
      return this.$(this.get('onElement'));
    }
    return this._super(...arguments);
  }
});
