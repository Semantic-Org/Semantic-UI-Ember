import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'popup',
  contentChanges: Ember.observer('content', function() {
    this.didInsertElement();
  }),
  attributeBindings: ['content:data-content']
});
