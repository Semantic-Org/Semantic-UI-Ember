import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Component.extend(Base, {
  module: 'dropdown',
  classNames: ['ui', 'dropdown'],

  didInsertElement() {
    this._super(...arguments);
    var selected = this.get('selected');
    if (Ember.isPresent(selected)) {
      this.execute('set selected', this.getSelected(selected));
    }
  },

  getSelected(selected) {
    return selected;
  },

  updateProperty: function(property) {
    return function() {
      if (property === 'selected') {
        let selected = this.get(property);
        let value = this.getSelected(selected);
        if (Ember.isBlank(value)) {
          this.execute('clear');
        } else {
          this.execute('set ' + property, value);
        }
      } else {
        this.execute('set ' + property, this.get(property));
      }
    };
  },

  _onChange: function(value/*, text, $element*/) {
    this.set('selected', value);
  }
});
