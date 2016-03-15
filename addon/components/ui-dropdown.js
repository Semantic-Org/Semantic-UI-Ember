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
      this.set('boundValue', 'selected');
      this.execute('set selected', selected);
    }
  }),

  _onChange: function(value/*, text, $element*/) {
    this.set(this.get('boundValue') || 'selected', value);
  }
});
