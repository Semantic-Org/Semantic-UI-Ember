import Ember from 'ember';

export default Ember.SelectOption.extend({
  tagName: 'div',
  classNames: 'item',

  bindData: Ember.on('didInsertElement', function() {
    var valuePath = this.get('valuePath');

    if (!valuePath) {
      return;
    }

    if (this.$() == null) {
      return;
    }

    this.$().data('value', this.get(valuePath));
  }),

  unbindData: Ember.on('willDestroyElement', function() {
    this.$().removeData('value');
  })
});
