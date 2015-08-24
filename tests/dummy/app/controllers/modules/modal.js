/* global alert */
import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    openModal: function(name) {
      $('.ui.' + name + '.modal').modal('show');
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
