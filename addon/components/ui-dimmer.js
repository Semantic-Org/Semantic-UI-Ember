import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-dimmer';

export default Ember.Component.extend(Base, {
  layout,
  module: 'dimmer'
});
