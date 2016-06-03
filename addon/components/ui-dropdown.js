import Ember from 'ember';
import Base from '../mixins/base';

const _proxyCallback = function(callbackName) {
  return function(value, text, $element) {
    // if (!$element) {
    //   return;
    // }

    this.attrs[callbackName](this._getObjectOrValue(value), text, $element, this);
  };
};

export default Ember.Component.extend(Base, {
  module: 'dropdown',
  classNames: ['ui', 'dropdown'],
  ignorableAttrs: ['selected'],
  objectMap: null,

  init() {
    this._super(...arguments);
    this.set('objectMap', {});
  },

  willDestroyElement() {
    this._super(...arguments);
    this.set('objectMap', null);
  },

  // Semantic Hooks
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

  didInitSemantic() {
    this._super(...arguments);
    var selected = this.get('selected');
    if (this.get('_settableAttrs').contains('selected')) {
      this.get('_settableAttrs').removeObject('selected');
      this.get('_bindableAttrs').addObject('selected');
    }

    if (Ember.isPresent(selected)) {
      let selectedValue = this._getObjectKeyByValue(selected);
      this.execute('set selected', selectedValue);
    }
  },

  getSemanticAttr(attrName) {
    if (attrName === 'selected') {
      return this.execute('get value');
    }
    return this._super(...arguments);
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'selected') {
      let value = this._getObjectKeyByValue(attrValue);
      if (Ember.isBlank(value)) {
        return this.execute('clear');
      }
      return this.execute('set selected', value);
    }
    return this._super(...arguments);
  },

  _onChange: _proxyCallback('onChange'),
  _onAdd: _proxyCallback('onAdd'),
  _onRemove: _proxyCallback('onRemove'),

  actions: {
    mapping(object) {
      let guid = Ember.guidFor(object);
      if (this.get('objectMap').hasOwnProperty(guid)) {
        Ember.Logger.warn('The dropdown already had a guid generated for the object passed in.');
        Ember.Logger.warn(object);
      } else {
        this.get('objectMap')[guid] = object;
        // Ember.Logger.info(guid);
      }
      return guid;
    }
  },

  _getObjectOrValue(value) {
    if (this.get('objectMap').hasOwnProperty(value)) {
      return this.get('objectMap')[value];
    }
    if (Ember.isEmpty(value)) {
      return null;
    }
    return value;
  },

  _getObjectKeyByValue(value) {
    // Since semantic is always binding to strings, we must return a string
    // Either through the object mapping or directly stringed value
    let objectMap = this.get('objectMap');
    for (let key in objectMap) {
      if (objectMap[key] === value) {
        return key;
      }
    }
    if (value == null) {
      return '';
    }
    return value.toString();
  }
});
