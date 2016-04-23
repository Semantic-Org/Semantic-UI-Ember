/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transition: function() {
      $('img').transition('horizontal flip', '500ms');
    }
  }
});
