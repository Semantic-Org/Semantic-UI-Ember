import Ember from 'ember';

var Progress = Ember.Component.extend({
  module: 'progress',
  classNames: [ 'ui', 'progress' ],
  attributeBindings: [ 'percent', 'total', 'value' ]
});

export default Progress;
