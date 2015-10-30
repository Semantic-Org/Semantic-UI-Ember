import Ember from 'ember';

export default Ember.Component.extend({
  module: 'popup',
  attributeBindings: ['content:data-content'],

  contentChanges: Ember.observer('content', function() {
    this.didInsertElement();
  })
});
