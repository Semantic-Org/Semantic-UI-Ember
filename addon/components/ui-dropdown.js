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

  _onChange: function(value/*, text, $element*/) {
    this.set('selected', value);
  }
});
