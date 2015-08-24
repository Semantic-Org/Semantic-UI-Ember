import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    show: function(component) {
      this.$('.ui.segment').dimmer('show');
    },

    hide: function(component) {
      this.$('.ui.segment').dimmer('hide');
    }
  }
});
