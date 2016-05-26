import Ember from 'ember';
import Base from './base';

/*
 * Checkbox Component Mixin
 */
var CheckboxMixin = Ember.Mixin.create(Base, {
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],
  ignorableAttrs: ['checked', 'label'],

  // Internal wrapper for onchange, to pass through checked
  _onChange() {
    let checked = this.execute('is checked');
    this.attrs.onChange(checked, this);
  },

  willInitSemantic(settings) {
    this._super(...arguments);
    if (settings.onChange) {
      settings.onChange = this._onChange;
    }
    if (this._getAttrValue('readonly') != null) {
      this.$().toggleClass('read-only', this._getAttrValue('readonly'));
    }
  },

  didInitSemantic() {
    // We need to fake that its bindable for checked and disabled
    this._swapAttrs('checked');
    this._swapAttrs('disabled');
    this._swapAttrs('enabled');
    if (this._getAttrValue('readonly') != null) {
      this.get('_settableAttrs').addObject('readonly');
    }
  },

  _swapAttrs(attrName) {
    if (this.get('_settableAttrs').contains(attrName)) {
      this.get('_settableAttrs').removeObject(attrName);
      this.get('_bindableAttrs').addObject(attrName);
    }
  },

  getSemanticAttr(attrName) {
    if (attrName === 'checked') {
      return this.execute('is checked');
    }
    if (attrName === 'disabled') {
      return this.execute('is disabled');
    }
    if (attrName === 'enabled') {
      return this.execute('is enabled');
    }
    return this._super(...arguments);
  },

  setSemanticAttr(attrName, attrValue) {
    // Handle checked
    if (attrName === 'checked') {
      if (attrValue) {
        return this.execute('set checked');
      }
      return this.execute('set unchecked');
    }
    // Handle disabled
    if (attrName === 'disabled') {
      if (attrValue) {
        return this.execute('set disabled');
      }
      return this.execute('set enabled');
    }
    // Handle enabled
    if (attrName === 'enabled') {
      if (attrValue) {
        return this.execute('set enabled');
      }
      return this.execute('set disabled');
    }
    // Handle readonly
    if (attrName === 'readonly') {
      // We need to add a class verses updating the property, since semantic is caching the value internall
      return this.$().toggleClass('read-only', attrValue);
    }
    // Default
    return this._super(...arguments);
  }
});

export default CheckboxMixin;
