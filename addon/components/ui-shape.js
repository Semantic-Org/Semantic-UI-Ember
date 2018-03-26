import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-shape';

export default Ember.Component.extend(Base, {
  layout,
  module: 'shape',
  classNames: ['ui', 'shape']
});
