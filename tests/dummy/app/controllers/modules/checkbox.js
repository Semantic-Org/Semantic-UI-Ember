import Ember from 'ember';

export default Ember.Controller.extend({
  checked: false,
  pre_checked: true,
  _action_checked: false,
  action_checked: Ember.computed('_action_checked', function() {
    return this.get('_action_checked');
  }),

  fruit: null,
  color: "red",

  actions: {
    set_checked: function(value) {
      this.set('_action_checked', value);
    }
  }
});
