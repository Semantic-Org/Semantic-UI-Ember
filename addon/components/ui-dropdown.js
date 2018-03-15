import Ember from 'ember';
import Base from '../mixins/base';
import PromiseResolver from 'ember-promise-utils/mixins/promise-resolver';
import layout from '../templates/components/ui-dropdown';

const _proxyCallback = function(callbackName) {
  return function(value, text, $element) {
    return this.get(`attrs.${callbackName}`)(this._getObjectOrValue(value), text, $element, this);
  };
};

export default Ember.Component.extend(Base, PromiseResolver, {
  layout,
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
    // We need to ensure the internal value is set to '',
    // otherwise when we get the value later it is undefined
    // and semantic returns the module instead of the actual value
    this.execute('clear');
    this._inspectSelected();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._inspectSelected();
  },

  actions: {
    mapping(object) {
      let guid = Ember.guidFor(object);
      if (!this._hasOwnProperty(this.get('objectMap'), guid)) {
        this.get('objectMap')[guid] = object;
      }
      Ember.run.scheduleOnce('afterRender', this, this._inspectSelected);
      return guid;
    }
  },

  // Method proxies
  _onChange(value, text, $element) {
    // Semantic calls the events on any 'set {action}'
    // Because of that we want to ignore calls when we are
    // Specifically setting the value
    if (this.get('_isSettingSelect')) {
      return;
    }
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
    if (this._hasOwnProperty(this.get('objectMap'), value)) {
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
      this.set('_isSettingSelect', true);
      this._setCurrentSelected(selectedValue, moduleSelected, isMultiple);
      this.set('_isSettingSelect', false);
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

  _setCurrentSelected(selectedValue, moduleSelected, isMultiple) {
    if (Ember.isBlank(selectedValue)) {
      if (!Ember.isBlank(moduleSelected)) {
        this.execute('clear');
      }
      return;
    }

    if (Ember.isArray(selectedValue)) {
      let keys = [];
      if (!isMultiple) {
        Ember.Logger.error("Selected is an array of values, but the dropdown doesn't have the class 'multiple'");
        return;
      }

      for (let i = 0; i < Ember.get(selectedValue, 'length'); i++) {
        let item = this._atIndex(selectedValue, i);
        keys.push(this._getObjectKeyByValue(item));
      }

      return this.execute('set exactly', keys);
    }

    let key = this._getObjectKeyByValue(selectedValue);
    return this.execute('set selected', key);
  },

  _areSelectedEqual(selectedValue, moduleValue, isMultiple) {
    if (isMultiple) {
      // If selectedValue passed in is an array, we are assuming that its the collection getting updated and that
      // all module values must equal the attrValues

      // If both are in a blank state of some kind, they are equal.
      // i.e. selected could be null and moduleValue could be an empty array
      if (Ember.isBlank(selectedValue) && Ember.isBlank(moduleValue)) {
        return true;
      }

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
        // If we didn't return, the arrays are equal
        return true;
      }
      // otherwise, just try to see one of the values in the module equals the attr value
      // The use case is the selected value is a single value to start, then the module value is an array
      else if (Ember.isArray(moduleValue)) {
        for (let i = 0; i < Ember.get(moduleValue, 'length'); i++) {
          let item = this._atIndex(moduleValue, i);
          if (this.areAttrValuesEqual('selected', selectedValue, item)) {
            return true; // We found a match, just looking for one
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
