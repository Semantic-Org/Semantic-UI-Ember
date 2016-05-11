import Ember from 'ember';
import Base from '../mixins/base';

var Rating = Ember.Component.extend(Base, {
  module: 'rating',
  classNames: [ 'ui', 'rating' ],

  // init() {
  //   this._super(...arguments);
  //   if (!this.attrs.initialRating && this.attrs.rating) {
  //     this.attrs.initialRating = this.attrs.rating;
  //   }
  // },

  // didInsertElement() {
  //   this.set('initialized', false);
  //   this._super(...arguments);
  //   this.set('initialized', true);
  // },

  // _onRate(value) {
  //   // Values are set on init, and causes render errors
  //   if (!this.get('initialized')) {
  //     return;
  //   }
  //   this.set('rating', value);
  // }
});

export default Rating;
