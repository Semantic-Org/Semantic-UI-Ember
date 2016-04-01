import Ember from 'ember';
import Base from '../mixins/base';

var Rating = Ember.Component.extend(Base,{
  module: 'rating',
  classNames: [ 'ui', 'rating' ],

  init() {
    this._super(...arguments);

    if (!this.get('initialRating') && this.get('rating')) {
      this.set('initialRating', this.get('rating'));
    }
  },

  onRate(value) {
    this.set('rating', this.get('value'));
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this.$()[this.get("module")](this.settings(this.get("module")));
  }
});

export default Rating;
