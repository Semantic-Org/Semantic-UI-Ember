import Ember from 'ember';
import Base from '../mixins/base';

var Progress = Ember.Component.extend(Base,{
  module: 'progress',
  classNames: ['ui', 'progress'],
  attributeBindings: [ 'percent', 'total', 'value' ],

  updatePercent: Ember.observer('percent', function() {
    this.execute('set percent', this.get('percent'));
  })
});

export default Progress;
