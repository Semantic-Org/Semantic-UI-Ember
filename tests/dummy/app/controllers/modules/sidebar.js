/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggle: function(id) {
      $(`#${id}`).sidebar('toggle');
    }
  }
});
