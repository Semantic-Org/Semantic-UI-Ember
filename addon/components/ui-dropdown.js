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
      Ember.deprecate('Bind to selected on ui-dropdown instead of value as semantic doesn\'t update the display when the value is set', false);
      this.execute('set value', value);
    }
  }),

  _onChange: function(value/*, text, $element*/) {
    this.set('selected', value);
  }
});
