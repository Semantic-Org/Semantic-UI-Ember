import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  moduleName: 'popup',
  attributeBindings: ['content:data-content'],
  
  contentChanges: Ember.observer('content', function() {
    this.didInsertElement();
  })
});
