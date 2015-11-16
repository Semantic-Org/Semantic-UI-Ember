import Ember from 'ember';

export default Ember.Controller.extend({
  checked: false,
  
  fruit: "apple",
    
  actions: {
    set_checked: function(value) {
      this._super();
      console.log(value);
    }
  }
});
