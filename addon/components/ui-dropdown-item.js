import Ember from 'ember';

export default Ember.SelectOption.extend({
  tagName: 'div',
  classNames: 'item',

  bindData: function() {
    var valuePath = this.get('parentView.optionValuePath');

    if (!valuePath) {
      return;
    }

    if (this.$() == null) {
      return;
    }

    this.$().data('value', this.get(valuePath));
    this.set('initialized',true);
  }.on('didInsertElement'),

  unbindData: function() {
    this.$().removeData('value')
  }.on('willDestroyElement')
});
