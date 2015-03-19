import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'popup',
  contentChanges: function() {
    this.didInsertElement();
  }.observes('content'),
  attributeBindings: [ 'content:data-content' ]
});
