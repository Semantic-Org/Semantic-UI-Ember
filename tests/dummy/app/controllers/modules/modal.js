import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  actions: {
    openModal: function(name) {
      $('.ui.' + name + '.modal').modal('show');
    },

    approveModal: function(element, component) {
      alert('approve ' + component.get('name'));
      return false;
    },

    denyModal: function(element, component) {
      alert('deny ' + component.get('name'));
      return true;
    }
  }
});
