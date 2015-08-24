/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    flip: function(direction) {
      $('.ui.shape').shape('flip ' + direction);
    }
  }
});
