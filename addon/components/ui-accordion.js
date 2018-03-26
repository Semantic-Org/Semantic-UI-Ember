import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-accordion';

export default Ember.Component.extend(Base, {
  layout,
  module: 'accordion',
  classNames: ['ui', 'accordion']
});
