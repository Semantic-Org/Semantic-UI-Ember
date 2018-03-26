import Ember from 'ember';
import Base from './base';

/*
 * Checkbox Component Mixin
 */
var CheckboxMixin = Ember.Mixin.create(Base, {
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],

  willInitSemantic(settings) {
    let owner = Ember.getOwner(this);
    let fastboot = owner.lookup('service:fastboot');
    if (fastboot && fastboot.get('isFastBoot')) {
      return;
    }
    this._super(...arguments);
    if (settings.onChange) {
      // Checkbox and radio both have an implementation for this
      settings.onChange = this.get('_onChange');
    }
    if (this._hasOwnProperty(this.attrs, 'readonly') || this.get('readonly') != null) {
      this.$().toggleClass('read-only', this.get('readonly'));
    }
  },

  didInitSemantic() {
    this._super(...arguments);
    // We need to fake that its bindable for checked and disabled
    this._setAttrBindable('checked');
    this._setAttrBindable('disabled');
    this._setAttrBindable('enabled');
    if (this.get('readonly') != null) {
      this.get('_settableAttrs').addObject('readonly');
    }
    // Init initial value set properties correctly
    if (this.get('checked') != null) {
      this.setSemanticAttr('checked', this.get('checked'));
    }
    if (this.get('disabled') != null) {
      this.setSemanticAttr('disabled', this.get('disabled'));
    }
    if (this.get('enabled') != null) {
      this.setSemanticAttr('enabled', this.get('enabled'));
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
