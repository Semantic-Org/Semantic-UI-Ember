import Ember from 'ember';
import Base from '../mixins/base';

var Progress = Ember.Component.extend(Base,{
  moduleName: 'progress',
  classNames: [ 'ui', 'progress' ],
  attributeBindings: [ 'percent', 'total', 'value' ]
});

export default Progress;
