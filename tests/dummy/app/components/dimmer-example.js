import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    show: function() {
      this.$('.ui.segment').dimmer('show');
    },

    hide: function() {
      this.$('.ui.segment').dimmer('hide');
    }
  }
});
