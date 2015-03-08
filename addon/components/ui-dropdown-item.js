import Ember from 'ember';

export default Ember.SelectOption.extend({
  tagName: 'div',
  classNames: 'item',

  bindData: function() {
    var valuePath = this.get('valuePath');

    if (!valuePath) {
      return;
    }

    if (this.$() == null) {
      return;
    }

    this.$().data('value', this.get(valuePath));
  }.on('didInsertElement'),

  unbindData: function() {
    this.$().removeData('value');
  }.on('willDestroyElement')
});
