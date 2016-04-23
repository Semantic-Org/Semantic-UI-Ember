/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    flip: function(direction) {
      $('.ui.shape').shape('flip ' + direction);
    }
  }
});
