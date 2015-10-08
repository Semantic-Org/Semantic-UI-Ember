import Ember from 'ember';
import Base from '../mixins/base';

var Rating = Ember.Component.extend(Base,{
  module: 'rating',
  classNames: [ 'ui', 'rating' ],

  init: function() {
    this._super();

    if (!this.get('initialRating') && this.get('rating')) {
      this.set('initialRating', this.get('rating'));
    }
  }
});

export default Rating;
