import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-progress';

export default Ember.Component.extend(Base, {
  layout,
  module: 'progress',
  classNames: ['ui', 'progress'],
  ignorableAttrs: ['progress']
});
