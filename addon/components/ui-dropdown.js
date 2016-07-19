import Ember from 'ember';
import Base from '../mixins/base';
import PromiseResolver from '../mixins/promise-resolver';

const _proxyCallback = function(callbackName) {
  return function(value, text, $element) {
    return this.get(`attrs.${callbackName}`)(this._getObjectOrValue(value), text, $element, this);
  };
};

export default Ember.Component.extend(Base, PromiseResolver, {
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
      settings.onChange = this.get('_onChange');
    }
    if (settings.onAdd) {
      settings.onAdd = this.get('_onAdd');
    }
    if (settings.onRemove) {
      settings.onRemove = this.get('_onRemove');
    }
  },

  didInitSemantic() {
    this._super(...arguments);
    // We want to handle this outside of the standard process
    this.get('_settableAttrs').removeObject('selected');
    this._inspectSelected();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._inspectSelected();
  },

  actions: {
    mapping(object) {
      let guid = Ember.guidFor(object);
      if (!this.get('objectMap').hasOwnProperty(guid)) {
        this.get('objectMap')[guid] = object;
      }
      // If selected is already resolved and we have a value now,
      // Select it after render
      // TODO: HERE
      return guid;
    }
  },

  // Method proxies
  _onChange(value, text, $element) {
    let returnValue;
    if (this.execute('is multiple')) {
      let values = this.execute('get values');
      returnValue = [];
      for (let i = 0; i < Ember.get(values, 'length'); i++) {
        let item = this._atIndex(values, i);
        returnValue.push(this._getObjectOrValue(item));
      }
    } else {
      returnValue = this._getObjectOrValue(value);
    }
    return this.attrs.onChange(returnValue, text, $element, this);
  },
  _onAdd: _proxyCallback('onAdd'),
  _onRemove: _proxyCallback('onRemove'),

  // Private methods
  _atIndex(collection, index) {
    if (typeof collection.objectAt === 'function') {
      return collection.objectAt(index);
    }
    return collection[index];
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

  _inspectSelected() {
    let selected = this.get('selected');
    return this.resolvePromise(selected, this._checkSelected);
  },

  _checkSelected(selectedValue) {
    let isMultiple = this.execute('is multiple');
    let moduleSelected = this._getCurrentSelected(isMultiple);

    if (!this._areSelectedEqual(selectedValue, moduleSelected, isMultiple)) {
      this._setCurrentSelected(selectedValue, isMultiple);
    }
  },

  _getCurrentSelected(isMultiple) {
    if (isMultiple) {
      let keys = this.execute('get values');
      let returnValues = [];
      for (let i = 0; i < keys.length; i++) {
        let key = this._atIndex(keys, i);
        returnValues.push(this._getObjectOrValue(key));
      }
      return returnValues;
    }

    let key = this.execute('get value');
    return this._getObjectOrValue(key);
  },

  _setCurrentSelected(selectedValue, isMultiple) {
    if (Ember.isBlank(selectedValue)) {
      return this.execute('clear');
    }

    let key;
    if (Ember.isArray(selectedValue)) {

      if (!isMultiple) {
        Ember.Logger.error("Selected is an array of values, but the dropdown doesn't have the class 'multiple'");
        return;
      }

      key = [];
      for (let i = 0; i < Ember.get(selectedValue, 'length'); i++) {
        let item = this._atIndex(selectedValue, i);
        key.push(this._getObjectKeyByValue(item));
      }
    } else {
      key = this._getObjectKeyByValue(selectedValue);
    }

    return this.execute('set selected', key);
  },

  _areSelectedEqual(selectedValue, moduleValue, isMultiple) {
    if (isMultiple) {
      // If selectedValue passed in is an array, we are assuming that its the collection getting updated and that
      // all module values must equal the attrValues
      if (Ember.isArray(selectedValue)) {
        if (Ember.get(selectedValue, 'length') !== Ember.get(moduleValue, 'length')) {
          return false;
        }

        // Loop through the collections and see if they are equal
        for (let i = 0; i < Ember.get(selectedValue, 'length'); i++) {
          let value = this._atIndex(selectedValue, i);
          let equal = false;
          for (let j = 0; j < Ember.get(moduleValue, 'length'); j++) {
            let module = this._atIndex(moduleValue, j);
            if (this.areAttrValuesEqual('selected', value, module)) {
              equal = true;
              break;
            }
          }
          if (!equal) {
            return false;
          }
        }
      } // otherwise, just try to see one of the values in the module equals the attr value
      else if (Ember.isArray(moduleValue)) {
        for (let i = 0; i < Ember.get(moduleValue, 'length'); i++) {
          let item = this._atIndex(moduleValue, i);
          if (this.areAttrValuesEqual('selected', selectedValue, item)) {
            return true; // We found a match
          }
        }
        return false;
      }
    }
    return this.areAttrValuesEqual('selected', selectedValue, moduleValue);
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