import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'embed',
  classNames: ['ui', 'embed'],
  attributeBindings: ['data-icon', 'data-id', 'data-placeholder', 'data-source', 'data-url'],
  ignorableAttrs: ['data-icon', 'data-id', 'data-placeholder', 'data-source', 'data-url']
});
