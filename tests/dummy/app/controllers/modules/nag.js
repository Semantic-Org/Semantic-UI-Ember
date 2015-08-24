/* global $ */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    clear: function() {
      $('.cookie.nag').nag('clear');
      $('.cookie.nag').nag('show');
    }
  }
});
