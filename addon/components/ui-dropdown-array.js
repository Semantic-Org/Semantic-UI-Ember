import Ember from 'ember';
import UiDropdown from 'semantic-ui-ember/components/ui-dropdown';

export default UiDropdown.extend({
  content: null,
  find_by: 'id',

  getSemanticIgnorableAttrs() {
    let ignorableAttrs = this._super(...arguments);
    ignorableAttrs.pushObjects(['content']);
    return ignorableAttrs;
  },

  willInitSemantic(settings) {
    this._super(...arguments);
    if (settings.onChange) {
      settings.onChange = this._onChange;
    }
    if (settings.onAdd) {
      settings.onAdd = this._onAdd;
    }
    if (settings.onRemove) {
      settings.onRemove = this._onRemove;
    }
  },

  getSelected(selected) {
    if (Ember.isBlank(selected)) {
      return null;
    }
    return Ember.get(selected, this.get('find_by'));
  },

  areAttrValuesEqual(attrName, attrValue, moduleValues) {
    if (attrName === 'selected') {
      let selectedValue = this.getSelected(attrValue);
      return this._areEqual(selectedValue, moduleValues);
    }
    return this._super(...arguments);
  },

  _onChange() {
    let args = [].splice.call(arguments, 0);
    args.push(this.attrs.onChange);
    this._proxyCallback.apply(this, args);
  },

  _onAdd() {
    let args = [].splice.call(arguments, 0);
    args.push(this.attrs.onAdd);
    this._proxyCallback.apply(this, args);
  },

  _onRemove() {
    let args = [].splice.call(arguments, 0);
    args.push(this.attrs.onRemove);
    this._proxyCallback.apply(this, args);
  },

  _proxyCallback(value, text, $element, component, callback) {
    if (!$element) {
      return;
    }

    let contentValue = this._findValue(value);
    callback(contentValue, text, $element, component);
  },

  _findValue(value) {
    return this.get('content').find((item) => {
      var current = Ember.get(item, this.get('find_by'));
      if (current == null) {
        current = '';
      }
      if (value == null) {
        value = '';
      }
      return this._areEqual(current, value);
    });
  },

  _areEqual(valueOne, valueTwo) {
    return valueOne === valueTwo ||
             valueOne.toString() === valueTwo ||
             valueOne === valueTwo.toString() ||
             valueOne.toString() == valueTwo.toString();
  }
});
