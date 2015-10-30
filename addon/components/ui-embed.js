import Ember from 'ember';

export default Ember.Component.extend({
  module: 'embed',
  classNames: [ 'ui', 'embed' ],
  attributeBindings: ['data-id', 'data-source', 'data-placeholder', 'data-url', 'data-icon']
});
