import Ember from 'ember';
import Base from '../mixins/base';

var Rating = Ember.Component.extend(Base,{
  module: 'rating',
  classNames: ['ui', 'rating']
});

export default Rating;
