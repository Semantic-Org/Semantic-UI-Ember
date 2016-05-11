import Ember from 'ember';
import Semantic from '../semantic';

// Static properties to ignore
// const DEBUG = ['debug', 'performance', 'verbose'];
// const STANDARD = ['name', 'namespace', 'className', 'metadata', 'selector'];
// const EMBER = ['context', 'on', 'template', 'execute'];

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
        if (typeof value === 'function') {
          custom[key] = Ember.run.bind(this, this.updateFunctionWithParameters(key, value));
        } else {
          custom[key] = value;
        }
      }
    }

    // for (key in component.settings) {
    //   prop = component.settings[key];
    //   if (window.$.inArray(key, DEBUG) >= 0) {

    //   if (window.$.inArray(key, STANDARD) >= 0) {
    //     continue;
    //   }

    //   if (typeof prop === 'function' && typeof (this.get(key) || this.get(`_${key}`)) !== 'function') {
    //     continue;
    //   }

    //   if (window.$.inArray(key, EMBER) >= 0) {
    //     value = this.get(`ui_${key}`);
    //   } else {
    //     if (typeof this.get(key) !== 'undefined') {
    //       value = this.get(key);
    //     } else {
    //       value = this.get(`_${key}`);
    //     }
    //   }

    //   if (value != null) {
    //     if (typeof value === 'function') {
    //       custom[key] = Ember.run.bind(this, this.updateFunctionWithParameters(key, value));
    //     } else {
    //       custom[key] = value;
    //     }
    //   }
    // }

    return custom;
  },

  // updateProperty(property) {
  //   return function() {
  //     this.execute('set ' + property, this.get(property));
  //   };
  // },

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
    this.$()[this.get("module")](this.settings(this.get("module")));
  },

  didInsertElement() {
    this._super(...arguments);
    this.initializeModule();

    // Get the modules settable and gettable properties.
    let settableProperties = Ember.A(Object.keys(this.execute('internal', 'set')));
    let gettableProperties = Ember.A(Object.keys(this.execute('internal', 'get')));

    for (let key in this.attrs) {
      if (settableProperties.contains(key) && gettableProperties.contains(key)) {
        this.get('bindableAttrs').addObject(key);
      }
    }
    this.set('initialized', true);
  },

  didUpdateAttrs() {
    this._super(...arguments);
    for (let bindableAttr of this.get('bindableAttrs')) {
      let attrValue = this.getAttrValue(bindableAttr);
      let moduleValue = this.execute(`get ${bindableAttr}`);
      if (this.notEqual(attrValue, moduleValue)) {
        this.execute(`set ${bindableAttr}`, attrValue);
      }
    }
    for (let settableAttr of this.get('settableAttrs')) {
      let attrValue = this.getAttrValue(settableAttr);
      this.execute(`set ${settableAttr}`, attrValue);
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
