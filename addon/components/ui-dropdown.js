import Ember from 'ember';
import Base from '../mixins/base';

const _proxyCallback = function(callbackName) {
  return function(value, text, $element) {
    return this.attrs[callbackName](this._getObjectOrValue(value), text, $element, this);
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
    this._swapAttrs('selected');

    var selected = this.get('selected');
    if (Ember.isPresent(selected)) {
      this.setSemanticAttr('selected', selected);
    }
  },

  getSemanticAttr(attrName) {
    if (attrName === 'selected') {
      if (this.execute('is multiple')) {
        let values = this.execute('get values');
        let returnValues = [];
        for (let value of values) {
          returnValues.push(this._getObjectOrValue(value));
        }
        return returnValues;
      } else {
        let value = this.execute('get value');
        return this._getObjectOrValue(value);
      }
    }
    return this._super(...arguments);
  },

  setSemanticAttr(attrName, attrValue) {
    if (attrName === 'selected') {

      let value;
      if (Ember.isArray(attrValue)) {

        if (!this.execute('is multiple')) {
          Ember.Logger.error("Selected is an array of values, but the dropdown doesn't have the class 'multiple'");
          return;
        }

        value = [];
        for (let item of attrValue) {
          value.push(this._getObjectKeyByValue(item));
        }
      } else {
        value = this._getObjectKeyByValue(attrValue);
      }

      if (Ember.isBlank(value)) {
        return this.execute('clear');
      }

      return this.execute('set selected', value);
    }
    return this._super(...arguments);
  },

  areAttrValuesEqual(attrName, attrValue, moduleValue) {
    if (this.execute('is multiple')) {
      // If attr passed in is an array, we are assuming that its the collection getting updated and that
      // all module values must equal the attrValues
      if (Ember.isArray(attrValue)) {
        // Loop through the collections and see if they are equal
        for (let value of attrValue) {
          let equal = false;
          for (let module of moduleValue) {
            if (this._super(attrName, value, module)) {
              equal = true;
              break;
            }
          }
          if (!equal) {
            return false;
          }
        }
      } else if (Ember.isArray(moduleValue)) { // otherwise, just try to see one of the values in the module equals the attr value
        for (let item of moduleValue) {
          if (this._super(attrName, attrValue, item)) {
            return true; // We found a match
          }
        }
        return false;
      }
    }
    // If its not multiple then default to base
    return this._super(...arguments);
  },

  _onChange(value, text, $element) {
    let returnValue;
    if (this.execute('is multiple')) {
      let values = this.execute('get values');
      returnValue = [];
      for (let item of values) {
        returnValue.push(this._getObjectOrValue(item));
      }
    } else {
      returnValue = this._getObjectOrValue(value);
    }
    return this.attrs.onChange(returnValue, text, $element, this);
  },
  _onAdd: _proxyCallback('onAdd'),
  _onRemove: _proxyCallback('onRemove'),

  actions: {
    mapping(object) {
      let guid = Ember.guidFor(object);
      if (this.get('objectMap').hasOwnProperty(guid)) {
        Ember.Logger.warn('The dropdown already had a guid generated for the object passed in. Is it in the list twice?');
        Ember.Logger.warn(object);
      } else {
        this.get('objectMap')[guid] = object;
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
