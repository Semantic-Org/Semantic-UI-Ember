import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-sidebar';

export default Ember.Component.extend(Base, {
  layout,
  module: 'sidebar',
  classNames: ['ui', 'sidebar']
});
