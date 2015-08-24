/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    toggle: function() {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
