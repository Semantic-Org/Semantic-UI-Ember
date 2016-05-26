import Ember from 'ember';
import Base from '../mixins/base';

var Rating = Ember.Component.extend(Base, {
  module: 'rating',
  classNames: ['ui', 'rating'],
  ignorableAttrs: ['rating'],

  willInitSemantic(settings) {
    this._super(...arguments);
    if (!settings.initialRating && this._getAttrValue('rating')) {
      settings.initialRating = this._getAttrValue('rating');
    }
  }
});

export default Rating;
