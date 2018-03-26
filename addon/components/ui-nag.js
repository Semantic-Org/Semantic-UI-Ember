import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-nag';

export default Ember.Component.extend(Base, {
  layout,
  module: 'nag',
  classNames: ['ui', 'nag']
});
