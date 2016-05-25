import Ember from 'ember';
import Semantic from '../semantic';

const EMBER = Ember.A(['class', 'classNames', 'classNameBindings', 'tagName']);

Semantic.BaseMixin = Ember.Mixin.create({
  /// Internal Variables
  _initialized: false,
  _bindableAttrs: null,
  _settableAttrs: null,

  /// EMBER HOOKS
  init() {
    this._super(...arguments);

    if (Ember.isBlank(this.getSemanticModuleName())) {
      return Ember.Logger.error('A module was not declared on semantic extended type');
    }
    this.set('_initialized', false);
    this.set('_bindableAttrs', Ember.A());
    this.set('_settableAttrs', Ember.A());
  },

  didInsertElement() {
    this._super(...arguments);
    this.initSemanticModule();

    // Get the modules settable and gettable properties.
    let settableProperties = Ember.A(Object.keys(this.execute('internal', 'set')));
    let gettableProperties = Ember.A(Object.keys(this.execute('internal', 'get')));

    for (let key in this.attrs) {
      // If it has a settable and gettable attribute, then its bindable
      if (settableProperties.contains(key) && gettableProperties.contains(key)) {
        this.get('_bindableAttrs').addObject(key);
      } else if (settableProperties.contains(key)) {
        // otherwise, its settable only
        this.get('_settableAttrs').addObject(key);
      }
    }
    this.didInitSemantic();
    this.set('_initialized', true);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.execute('destroy');
  },

  didUpdateAttrs() {
    this._super(...arguments);
    for (let bindableAttr of this.get('_bindableAttrs')) {
      let attrValue = this._getAttrValue(bindableAttr);
      let moduleValue = this.getSemanticAttr(bindableAttr);
      if (!this.areAttrValuesEqual(bindableAttr, attrValue, moduleValue)) {
        this.setSemanticAttr(bindableAttr, attrValue);
      }
    }
    for (let settableAttr of this.get('_settableAttrs')) {
      let attrValue = this._getAttrValue(settableAttr);
      this.setSemanticAttr(settableAttr, attrValue);
    }
  },

  /// Semantic Hooks
  getSemanticModuleName() {
    return this.get('module');
  },

  getSemanticModule() {
    let selector = this.$();
    if (selector != null) {
      let module = selector[this.getSemanticModuleName()];
      if (typeof module === 'function') {
        return module;
      }
    }
  },

  willInitSemantic(settings) {
    // Use this method to modify the settings object on inherited components, before module initialization
  },

  initSemanticModule() {
    let module = this.getSemanticModule();
    if (module) {
      module(this._settings());
    } else {
      Ember.Logger.error(`The Semantic UI module ${this.getSemanticModuleName()} was not found and did not initialize`);
    }
  },

  didInitSemantic() {
    // Use this method after the module is initialized to do post initialized changes
  },

  getSemanticAttr(attrName) {
    this.execute(`get ${attrName}`);
  },

  setSemanticAttr(attrName, attrValue) {
    this.execute(`set ${attrName}`, attrValue);
  },

  areAttrValuesEqual(attrName, attrValue, moduleValue) {
    // Enhance this
    return attrValue === moduleValue;
  },

  // Semantic Helper Methods
  execute() {
    let module = this.getSemanticModule();
    if (module) {
      return module.apply(this.$(), arguments);
    }
  },

  actions: {
    execute() {
      return this.execute(...arguments);
    }
  },

  // Private Methods
  _getAttrValue(name) {
    let value = this.attrs[name];

    if (Ember.isBlank(value)) {
      return value;
    }

    // if its a mutable object, get the actual value
    if (typeof value === 'object') {
      let objectKeys = Ember.A(Object.keys(value));
      if (objectKeys.any((objectkey) => objectkey.startsWith('MUTABLE_CELL') )) {
        value = value.value;
      }
    }

    return value;
  },

  _settings() {
    let moduleName = this.getSemanticModuleName();

    let component = window.$.fn[moduleName];
    if (!component) {
      Ember.Logger.error(`Unable to find jQuery Semantic UI module: ${moduleName}`);
      return;
    }

    let custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (let key in this.attrs) {
      let value = this._getAttrValue(key);

      if (Ember.isBlank(component.settings[key])) {
        if (!EMBER.contains(key)) {
          // TODO: Add better ember keys here
          Ember.Logger.debug(`You passed in the property '${key}', but a setting doesn't exist on the Semantic UI module: ${moduleName}`);
        }
        continue;
      }

      if (value != null) {
        custom[key] = value;
      }
    }

    // Init, and allow any overrides
    this.willInitSemantic(custom);

    // Late bind any functions over to use the right scope
    for (let key in custom) {
      let value = custom[key];
      if (typeof value === 'function') {
        custom[key] = Ember.run.bind(this, this._updateFunctionWithParameters(key, value));
      }
    }

    return custom;
  },

  _updateFunctionWithParameters(key, fn) {
    return function() {
      // TODO: Allow internal wrapper
      var args = [].splice.call(arguments, 0);
      // var internal = this.get(`_${key}`);

      // if (internal) {
      //   internal.apply(this, args);
      // }

      // if (internal !== fn) {
      // return fn.apply(this, [this].concat(args));
      if (this.get('_initialized')) {
        return fn.apply(this, args);
      }
      // }

      // return true;
    };
  }
});

export default Semantic.BaseMixin;
