import Ember from 'ember';

export default Ember.Component.extend({
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],
  type: 'checkbox',
  checked: false,

  onChange() {
    this.set('checked', this.$('input').prop('checked'));
  }
});
