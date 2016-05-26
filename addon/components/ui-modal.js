import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'modal',
  classNames: ['ui', 'modal'],

  willInitSemantic(settings) {
    this._super(...arguments);
    if (settings.detachable == null) {
      settings.detachable = false;
    }
    if (settings.observeChanges == null) {
      settings.observeChanges = true;
    }
  }
});
