import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';

export default Ember.Component.extend(CheckboxMixin, {
  type: 'radio',
  classNames: ['radio'],
  ignorableAttrs: ['checked', 'label', 'disabled', 'value', 'current'],

  init() {
    this._super(...arguments);

    if (Ember.isBlank(this.get('name'))) {
      this.set('name', 'default');
      Ember.Logger.warn("The required component parameter of 'name' was not passed into the ui-radio component");
    }
  },

  // Internal wrapper for onchange, to pass through checked
  _onChange() {
    let value = this.get('value');
    return this.attrs.onChange(value, this);
  },

  didInitSemantic() {
    this._super(...arguments);
    if (this.areAttrValuesEqual('checked', this.get('value'), this.get('current'))) {
      this.execute('set checked');
    }
    this.get('_bindableAttrs').addObject('value');
  },

  getSemanticAttr(attrName) {
    if (attrName === 'value') {
      return this.get('value');
    }
    return this._super(...arguments);
  },

  areAttrValuesEqual(attrName, attrValue, moduleValue) {
    // Special check for value being updated
    if (attrName === 'value') {
      let isChecked = this.execute('is checked');
      if (this._super('checked', this.get('value'), this.get('current'))) {
        // Value and current match, but radio isn't checked, return false
        if (!isChecked) {
          return false;
        }
      } else {
        // Value and current don't match and radio is checked, return false
        if (isChecked) {
          return false;
        }
      }
      return true;
    }
    return this._super(...arguments);
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'value') {
      return this._super('checked', attrValue);
    }
    return this._super(...arguments);
  }
});
