/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggle: function() {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
