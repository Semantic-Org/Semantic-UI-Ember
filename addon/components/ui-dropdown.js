import Ember from 'ember';
import Base from '../mixins/base';
import DataAttributes from '../mixins/data-attributes';

export default Ember.Component.extend(Base, DataAttributes, {
  module: 'dropdown',
  classNames: [ 'ui', 'dropdown' ],
  tagName: 'div',

  initialize: Ember.on('didInsertElement', function() {
    var selected = this.get('selected');
    if (typeof selected !== "undefined" && selected !== null) {
      this.execute('set selected', selected);
    }

    var value = this.get('value');
    if (typeof value !== "undefined" && value !== null) {
      this.execute('set value', value);
    }
  }),

  _onChange: function(value/*, text, $element*/) {
    this.set('selected', value);
  }
});
