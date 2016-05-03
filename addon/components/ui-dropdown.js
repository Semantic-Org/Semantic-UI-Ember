import Ember from 'ember';
import Base from '../mixins/base';
import DataAttributes from '../mixins/data-attributes';

export default Ember.Component.extend(Base, DataAttributes, {
  module: 'dropdown',
  classNames: [ 'ui', 'dropdown' ],

  didInsertElement() {
    this._super(...arguments);
    var selected = this.get('selected');
    if (typeof selected !== "undefined" && selected !== null) {
      this.execute('set selected', this.getSelected(selected));
    }
  },

  getSelected(selected) {
    return selected;
  },

  updateProperty: function(property) {
    return function() {
      if (property === 'selected') {
        let value = this.get(property);
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
