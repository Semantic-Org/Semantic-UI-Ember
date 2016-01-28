import Ember from 'ember';

export default Ember.Controller.extend({
  categories: [
    'Clothing',
    'Home',
    'Bedroom'
  ],

  gender: 0,
  genders: Ember.A([
    { id: 1, text: 'Male' },
    { id: 0, text: 'Female' }
  ]),

  country: null,
  countries: [
    { iso2: 'us', name: 'United States' },
    { iso2: 'ca', name: 'Canada' },
    { iso2: 'mx', name: 'Mexico' }
  ],

  initialize: Ember.on('init', function() {
    this.set('gender2', this.get('genders.firstObject'));
  }),

  actions: {
    set_active: function() {
      this.set('dropdown_active', true);
    },

    update_gender: function(component, id /*, value*/) {
      this.set('gender', id);
      return true;
    }
  }
});
