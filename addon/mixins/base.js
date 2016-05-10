import Ember from 'ember';
import Semantic from '../semantic';

// Static properties to ignore
// const DEBUG = ['debug', 'performance', 'verbose'];
// const STANDARD = ['name', 'namespace', 'className', 'metadata', 'selector'];
// const EMBER = ['context', 'on', 'template', 'execute'];

const EMBER = Ember.A(['class', 'classNames', 'classNameBindings']);

Semantic.BaseMixin = Ember.Mixin.create({
  init() {
    this._super(...arguments);

    if (Ember.isBlank(this.get('module'))) {
      return Ember.Logger.error('A module was not declared on semantic extended type');
    }
  },

  settings(module) {
    var component, custom, key, prop, value;

    component = window.$.fn[module];
    if (!component) {
      throw "Unable to find semantic module: " + module;
    }

    custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (let key in this.attrs) {
      let value = this.attrs[key];

      // ensure it isn't a mutable object
      if (typeof value === "object") {
        let objectKeys = Ember.A(Object.keys(value));
        if (objectKeys.any((objectkey) => objectkey.startsWith('MUTABLE_CELL') )) {
          value = value.value;
        }
      }

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
      return fn.apply(this, [this].concat(args));
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

    // var _this = this;
    // var properties = {};

    // Modules without setable properties
    // properties = this.execute('internal', 'set');
    // var property;

    // if (typeof properties === "object" && !Ember.isArray(properties)) {
    //   for(property in properties) {
    //     if (!properties.hasOwnProperty(property)) {
    //       continue;
    //     }

    //     if (this.hasOwnProperty(property)) {
    //       _this.addObserver(property, _this, _this.updateProperty(property));
    //     }
    //   }
    // }
  },

  willDestroyElement() {
    this._super(...arguments);
    var name, selector;
    if ((selector = this.$()) != null) {
      if (typeof selector[name = this.get("module")] === "function") {
        return selector[name]('destroy');
      }
    }
  },

  execute() {
    var selector, module;
    if ((selector = this.$()) != null) {
      if ((module = selector[this.get('module')]) != null) {
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
