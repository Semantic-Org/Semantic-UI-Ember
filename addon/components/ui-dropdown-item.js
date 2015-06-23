import Ember from 'ember';

export default Ember.SelectOption.extend({
  tagName: 'div',
  classNames: 'item',

  bindData: Ember.on('didInsertElement', function() {
    var valuePath = this.get('valuePath');

    if (!valuePath) {
      return;
    }

    if (window.$() == null) {
      return;
    }

    window.$().data('value', this.get(valuePath));
  }),

  unbindData: Ember.on('willDestroyElement', function() {
    window.$().removeData('value');
  })
});
