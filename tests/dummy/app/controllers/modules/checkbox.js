import Ember from 'ember';

export default Ember.Controller.extend({
  checked: false,

  actions: {
    set_checked: function(value) {
      this._super();
      console.log(value);
    }
  }
});
