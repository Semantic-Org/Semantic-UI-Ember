import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-modal';

export default Ember.Component.extend(Base, {
  layout,
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
