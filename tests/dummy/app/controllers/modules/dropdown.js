import Ember from 'ember';

export default Ember.Controller.extend({
  categories: [
    'Clothing',
    'Home',
    'Bedroom'
  ],

  types: [
    2,
    3,
    true,
    false,
    3.3,
    5.5,
    "string"
  ],

  selected_type: 5.5,

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

  init() {
    this._super(...arguments);
    this.set('gender2', this.get('genders.firstObject'));
  }
});
