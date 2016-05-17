import Ember from 'ember';
import Semantic from '../semantic';

const EMBER = Ember.A(['class', 'classNames', 'classNameBindings', 'tagName']);

Semantic.BaseMixin = Ember.Mixin.create({
  initialized: false,
  bindableAttrs: null,
  settableAttrs: null,

  init() {
    this._super(...arguments);

    if (Ember.isBlank(this.get('module'))) {
      return Ember.Logger.error('A module was not declared on semantic extended type');
    }
    this.set('bindableAttrs', Ember.A());
    this.set('settableAttrs', Ember.A());
  },

  settings(module) {
    var component, custom, key, prop, value;

    component = window.$.fn[module];
    if (!component) {
      throw 'Unable to find semantic module: ' + module;
    }

    custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (let key in this.attrs) {
      let value = this.getAttrValue(key);

      if (Ember.isBlank(component.settings[key])) {
        if (!EMBER.contains(key)) {
          Ember.Logger.debug(`You passed in the property '${key}', but a setting doesn't exist on the Semantic UI module: ${module}`);
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
        custom[key] = Ember.run.bind(this, this.updateFunctionWithParameters(key, value));
      }
    }

    return custom;
  },

  updateFunctionWithParameters(key, fn) {
    return function() {
      var args = [].splice.call(arguments, 0);
      // var internal = this.get(`_${key}`);

      // if (internal) {
      //   internal.apply(this, args);
      // }

      // if (internal !== fn) {
      // return fn.apply(this, [this].concat(args));
      if (this.get('initialized')) {
        return fn.apply(this, args);
      }
      // }

      // return true;
    };
  },

  initializeModule() {
    let settings = this.settings(this.get("module"));
    this.$()[this.get("module")](settings);
  },

  // Semantic helper methods
  willInitSemantic(settings) {
    // Use this method to modify the settings object on inherited components, before module initialization
  },

  didInitSemantic() {
    // Use this method after the module is initialized to do post initialized changes
  },

  willUpdateSemanticValue(attrName, attrValue) {
    this.execute(`set ${attrName}`, attrValue);
  },

  didInsertElement() {
    this._super(...arguments);
    this.initializeModule();

    // Get the modules settable and gettable properties.
    let settableProperties = Ember.A(Object.keys(this.execute('internal', 'set')));
    let gettableProperties = Ember.A(Object.keys(this.execute('internal', 'get')));

    for (let key in this.attrs) {
      // If it has a settable and gettable attribute, then its bindable
      if (settableProperties.contains(key) && gettableProperties.contains(key)) {
        this.get('bindableAttrs').addObject(key);
      } else if (settableProperties.contains(key)) {
        // otherwise, its settable only
        this.get('settableAttrs').addObject(key);
      }
    }
    this.didInitSemantic();
    this.set('initialized', true);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    for (let bindableAttr of this.get('bindableAttrs')) {
      let attrValue = this.getAttrValue(bindableAttr);
      let moduleValue = this.execute(`get ${bindableAttr}`);
      if (this.notEqual(attrValue, moduleValue)) {
        this.willUpdateSemanticValue(bindableAttr, attrValue);
      }
    }
    for (let settableAttr of this.get('settableAttrs')) {
      let attrValue = this.getAttrValue(settableAttr);
      this.willUpdateSemanticValue(settableAttr, attrValue);
    }
  },

  getAttrValue(name) {
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

  notEqual(attrValue, moduleValue) {
    // Enhance this
    return attrValue !== moduleValue;
  },

  willDestroyElement() {
    this._super(...arguments);
    let selector = this.$();
    if (selector != null) {
      let module = selector[this.get('module')];
      if (typeof module === 'function') {
        return module('destroy');
      }
    }
  },

  execute() {
    let selector = this.$();
    if (selector != null) {
      let module = selector[this.get('module')];
      if (typeof module === 'function') {
        return module.apply(this.$(), arguments);
      }
    }
  },

  actions: {
    execute() {
      this.execute(...arguments);
    }
  }
});

export default Semantic.BaseMixin;
