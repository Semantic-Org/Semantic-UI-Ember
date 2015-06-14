import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'item',
  
  label: Ember.computed('attrs.optionLabelPath', {
    get: function() {
      var path = this.get('attrs.optionLabelPath.value');
      if (path) {
        return this.get(path);
      }
    }
  }),
  
  value: Ember.computed('attrs.optionValuePath', {
    get: function() {
      var path = this.get('attrs.optionValuePath.value');
      if (path) {
        return this.get(path);
      }
    }
  }),

  bindData: function() {
    this.$().data('value', this.get('value'));
  }.on('didInsertElement'),

  unbindData: function() {
    this.$().removeData('value');
  }.on('willDestroyElement')
});
