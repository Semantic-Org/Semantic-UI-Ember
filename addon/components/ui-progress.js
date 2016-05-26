import Ember from 'ember';
import Base from '../mixins/base';

var Progress = Ember.Component.extend(Base, {
  module: 'progress',
  classNames: ['ui', 'progress'],
  ignorableAttrs: ['progress']
});

export default Progress;
