/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    transition: function() {
      $('img').transition('horizontal flip', '500ms');
    }
  }
});
