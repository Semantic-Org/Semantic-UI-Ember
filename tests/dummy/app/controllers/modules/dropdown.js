import Ember from 'ember';

export default Ember.Controller.extend({
  categories: [
    'Clothing',
    'Home',
    'Bedroom'
  ],
  color: null,
  colors: [
    { id: 1, name: 'Red' },
    { id: 0, name: 'Green' },
    { id: 3, name: 'Blue' }
  ],
  actions: {
    onSelect: function (colorObject) {
      this.set('color', colorObject.name);
    }
  }
});
