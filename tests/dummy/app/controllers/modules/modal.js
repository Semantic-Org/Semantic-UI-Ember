/* global alert */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    openModal: function(name) {
      this.trigger('showModal', name);
    },

    approveModal: function(name) {
      alert('approve ' + name);
      return false;
    },

    denyModal: function(name) {
      alert('deny ' + name);
      return true;
    }
  }
});
