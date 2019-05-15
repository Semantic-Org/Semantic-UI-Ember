import Ember from 'ember';
import Semantic from '../semantic';
import $ from 'jquery';

const EMBER_ATTRS = ['class', 'classNameBindings', 'classNames', 'tagName'];
const HTML_ATTRS = ['id', 'name', 'readonly', 'autofocus', 'tabindex', 'title'];
const CUSTOM_ATTRS = ['onElement'];

Semantic.BaseMixin = Ember.Mixin.create({
  /// Internal Variables
  _initialized: false,
  _bindableAttrs: null,
  _settableAttrs: null,
  _ignorableAttrs: null,

  attributeBindings: [
    'autofocus',
    'tabindex',
    'title'
  ],

  /// EMBER HOOKS
  init() {
    this._super(...arguments);

    if (Ember.isBlank(this.getSemanticModuleName())) {
      return Ember.Logger.error('A module was not declared on semantic extended type');
    }
    this.set('_initialized', false);
    this.set('_bindableAttrs', Ember.A());
    this.set('_settableAttrs', Ember.A());
    this.set('_ignorableAttrs', this.getSemanticIgnorableAttrs());
  },

  didInsertElement() {
    this._super(...arguments);
    this.initSemanticModule();

    // Get the modules settable and gettable properties.
    let settableProperties = Ember.A(Object.keys(this.execute('internal', 'set')));
    let gettableProperties = Ember.A(Object.keys(this.execute('internal', 'get')));

    for (let key in this.get('attrs')) {
      // If it has a settable and gettable attribute, then its bindable
      if (settableProperties.includes(key) && gettableProperties.includes(key)) {
        this.get('_bindableAttrs').addObject(key);
      } else if (settableProperties.includes(key)) {
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
    for (let i = 0; i < this.get('_bindableAttrs').length; i++) {
      let bindableAttr = this.get('_bindableAttrs')[i];
      let attrValue = this._getAttrValue(bindableAttr);
      let moduleValue = this.getSemanticAttr(bindableAttr);
      if (!this.areAttrValuesEqual(bindableAttr, attrValue, moduleValue)) {
        this.setSemanticAttr(bindableAttr, attrValue);
      }
    }
    for (let i = 0; i < this.get('_settableAttrs').length; i++) {
      let settableAttr = this.get('_settableAttrs')[i];
      let attrValue = this._getAttrValue(settableAttr);
      this.setSemanticAttr(settableAttr, attrValue);
    }
  },

  /// Semantic Hooks
  getSemanticIgnorableAttrs() {
    let ignorableAttrs = [];
    if (Ember.isPresent(this.get('ignorableAttrs'))) {
      ignorableAttrs = ignorableAttrs.concat(this.get('ignorableAttrs'));
    }
    ignorableAttrs = ignorableAttrs.concat(EMBER_ATTRS);
    ignorableAttrs = ignorableAttrs.concat(HTML_ATTRS);
    ignorableAttrs = ignorableAttrs.concat(CUSTOM_ATTRS);
    return Ember.A(ignorableAttrs);
  },

  getSemanticScope() {
    if (Ember.isPresent(this.get('onElement'))) {
      return this.$(this.get('onElement'));
    }
    return this.$();
  },

  getSemanticModuleName() {
    return this.get('module');
  },

  getSemanticModule() {
    if (this._isFastBoot()) {
      return;
    }
    let selector = this.getSemanticScope();
    if (selector != null) {
      let module = selector[this.getSemanticModuleName()];
      if (typeof module === 'function') {
        return module;
      }
    }
    return null;
  },

  getSemanticModuleGlobal() {
    if (this._isFastBoot()) {
      return;
    }
    let moduleName = this.getSemanticModuleName();
    return $.fn[moduleName];
  },

  willInitSemantic(settings) { // eslint-disable-line no-unused-vars
    // Use this method to modify the settings object on inherited components, before module initialization
  },

  initSemanticModule() {
    if (this._isFastBoot()) {
      return;
    }
    let module = this.getSemanticModule();
    if (module) {
      module.call(this.getSemanticScope(), this._settings());
    } else {
      Ember.Logger.error(`The Semantic UI module ${this.getSemanticModuleName()} was not found and did not initialize`);
    }
  },

  didInitSemantic() {
    // Use this method after the module is initialized to do post initialized changes
  },

  getSemanticAttr(attrName) {
    return this.execute(`get ${attrName}`);
  },

  setSemanticAttr(attrName, attrValue) {
    return this.execute(`set ${attrName}`, this._unwrapHTMLSafe(attrValue));
  },

  areAttrValuesEqual(attrName, attrValue, moduleValue) {
    return attrValue === moduleValue ||
           this._stringCompareIfPossible(attrValue) === this._stringCompareIfPossible(moduleValue) ||
           Ember.isEqual(attrValue, moduleValue);
  },

  // Semantic Helper Methods
  execute() {
    if (this._isFastBoot()) {
      return;
    }
    let module = this.getSemanticModule();
    if (module) {
      return module.apply(this.getSemanticScope(), arguments);
    }
    Ember.Logger.warn("The execute method was called, but the Semantic-UI module didn't exist.");
  },

  actions: {
    execute() {
      return this.execute(...arguments);
    }
  },

  // Private Methods
  _getAttrValue(name) {
    let value = this.get(`attrs.${name}`);

    if (Ember.isBlank(value)) {
      return value;
    }

    // if its a mutable object, get the actual value
    if (typeof value === 'object') {
      let objectKeys = Ember.A(Object.keys(value));
      if (objectKeys.any((objectkey) => objectkey.indexOf('MUTABLE_CELL') >= 0)) {
        value = Ember.get(value, 'value');
      }
    }

    return value;
  },

  _settings() {
    let moduleName = this.getSemanticModuleName();

    let moduleGlobal = this.getSemanticModuleGlobal();
    if (!moduleGlobal) {
      Ember.Logger.error(`Unable to find jQuery Semantic UI module: ${moduleName}`);
      return;
    }

    let custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (let key in this.get('attrs')) {
      let value = this._getAttrValue(key);

      if (!this._hasOwnProperty(moduleGlobal.settings, key)) {
        if (!this.get('_ignorableAttrs').includes(key) && !this.get('_ignorableAttrs').includes(Ember.String.camelize(key))) {
          // TODO: Add better ember keys here
          // Ember.Logger.debug(`You passed in the property '${key}', but a setting doesn't exist on the Semantic UI module: ${moduleName}`);
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
      if (typeof value === 'object') {
        if (Ember.String.isHTMLSafe(value)) {
          custom[key] = this._unwrapHTMLSafe(value);
        }
      }
    }

    return custom;
  },

  _updateFunctionWithParameters(key, fn) {
    return function() {
      var args = [].splice.call(arguments, 0);
      // always add component instance as the last parameter incase they need access to it
      args.push(this);

      if (this.get('_initialized')) {
        return fn.apply(this, args);
      }
    };
  },

  _stringCompareIfPossible(value) {
    // If its undefined or null, compare on null
    if (value == null) {
      return null;
    }
    // We should only compare string values on primitive types
    switch (typeof value) {
      case "string":
        return value;
      case "boolean":
      case "number":
        return value.toString();
      case "object":
        return this._unwrapHTMLSafe(value);
      default:
        // Don't convert to string, otherwise it would be "[Object]"
        return value;
    }
  },

  _setAttrBindable(attrName) {
    if (this.get('_settableAttrs').includes(attrName)) {
      this.get('_settableAttrs').removeObject(attrName);
      this.get('_bindableAttrs').addObject(attrName);
    }
  },

  _unwrapHTMLSafe(value) {
    if (Ember.String.isHTMLSafe(value)) {
      return value.toString();
    }
    return value;
  },

  _hasOwnProperty(object, property) {
    if (object) {
      if (object.hasOwnProperty && typeof object.hasOwnProperty === "function") {
        return object.hasOwnProperty(property);
      }
      // Ember 2.9 returns an EmptyObject, which doesn't have hasOwnProperty
      return Object.prototype.hasOwnProperty.call(object, property);
    }

    return false;
  },

  _isFastBoot() {
    let owner = Ember.getOwner(this);
    let fastboot = owner.lookup('service:fastboot');
    return fastboot && fastboot.get('isFastBoot');
  }
});

export default Semantic.BaseMixin;
