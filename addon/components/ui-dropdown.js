import Ember from 'ember';
import Base from '../mixins/base';
import DataAttributes from '../mixins/data-attributes';
import Item from './ui-dropdown-item';

export default Ember.Select.extend(Base, DataAttributes, {
  classNames: ['ui', 'dropdown'],
  module: 'dropdown',
  tagName: 'div',
  defaultTemplate: null,

  optionView: Item,

  groupedView: null,
  groupedContent: null,

  initialize: function() {
    var value = this.get('value');
    if (typeof value !== "undefined" && value !== null) {
      this.execute('set selected', value);
    }
  }.on('didInsertElement'),
    return this.set('value', value);
  },

  onUpdate: function() {
    return Ember.run.scheduleOnce('afterRender', this, this.set_value);
  }.observes('value'),

  set_value: function() {
    var dropdownValue, inputValue, _ref;
    inputValue = (_ref = this.get('value')) != null ? _ref.toString() : void 0;
    dropdownValue = this.execute("get value");
    if (inputValue == null) {
      return this.execute("restore defaults");
    } else if (inputValue !== dropdownValue) {
      return this.execute("set selected", this.get('value'));
    }
  }
});
