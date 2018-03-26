import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-sticky';

export default Ember.Component.extend(Base, {
  layout,
  module: 'sticky',
  classNames: ['ui', 'sticky']
});
