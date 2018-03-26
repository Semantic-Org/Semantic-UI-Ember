import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-search';

export default Ember.Component.extend(Base, {
  layout,
  module: 'search',
  classNames: ['ui', 'search']
});
