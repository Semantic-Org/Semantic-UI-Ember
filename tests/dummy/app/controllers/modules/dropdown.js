import Ember from 'ember';

export default Ember.Controller.extend({
  categories: [
    'Clothing',
    'Home',
    'Bedroom'
  ],

  gender: null,
  genders: [
    { id: 1, text: 'Male' },
    { id: 0, text: 'Female' }
  ]
});
