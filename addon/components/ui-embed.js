import Ember from 'ember';
import Base from '../mixins/base';
import layout from '../templates/components/ui-embed';

export default Ember.Component.extend(Base, {
  layout,
  module: 'embed',
  classNames: ['ui', 'embed'],
  attributeBindings: ['data-icon', 'data-id', 'data-placeholder', 'data-source', 'data-url'],
  ignorableAttrs: ['data-icon', 'data-id', 'data-placeholder', 'data-source', 'data-url']
});
