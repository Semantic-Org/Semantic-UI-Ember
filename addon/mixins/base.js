import Ember from 'ember';
import Semantic from '../semantic';

Semantic.BaseMixin = Ember.Mixin.create({
  moduleName: null,
  init() {
    this._super();
    Ember.assert('Module was not declared on semantic extended type', this.get('moduleName'));
  },

  settings() {
    const moduleName = this.get('moduleName');
    const component = Ember.$.fn[moduleName];
    //console.log(component);
    Ember.assert(`Unable to find semantic moduleName: ${moduleName}`, Ember.$.isFunction(component));

    Ember.assert(`Unable to find module settings: ${moduleName}`, Ember.$.isPlainObject(component.settings));

    var custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };

    for (var key in component.settings) {
      var value = null;
      var prop = component.settings[key];
      if (Ember.$.inArray(key, Semantic.BaseMixin.DEBUG) >= 0) {
        continue;
      }

      if (Ember.$.inArray(key, Semantic.BaseMixin.STANDARD) >= 0) {
        continue;
      }

      if (typeof prop === 'function' && typeof (this.get(key) || this.get(`_${key}`)) !== 'function') {
        continue;
      }

      if (Ember.$.inArray(key, Semantic.BaseMixin.EMBER) >= 0) {
        value = this.get(`ui_${key}`);
      } else {
        if (typeof this.get(key) !== 'undefined') {
          value = this.get(key);
        } else {
          value = this.get(`_${key}`);
        }
      }

      if (value !== null) {
        if (typeof value === 'function') {
          custom[key] = Ember.run.bind(this, this.updateFunctionWithParameters(key, value));
        } else {
          custom[key] = value;
        }
      }
    }

    return custom;
  },

  updateProperty(property) {
    return function() {
      this.execute('set ' + property, this.get(property));
    };
  },

  updateFunctionWithParameters(key, fn) {
    return function() {
      var args = [].splice.call(arguments, 0);
      var internal = this.get(`_${key}`);

      if (internal) {
        internal.apply(this, args);
      }

      if (internal !== fn) {
        return fn.apply(this, [this].concat(args));
      }

      return true;
    };
  },

  didInsertElement() {
    this.setSettings();
    this.propertyObserver();
  },

  setSettings() {
    const moduleName = this.get('moduleName');
    this.$()[moduleName](this.settings());
  },

  propertyObserver() {
    var properties = this.execute('set');
    for(let property in properties) {
      if (!properties.hasOwnProperty(property)) {
        continue;
      }
      this.addObserver(property, this, this.updateProperty(property));
    }
  },

  willDestroyElement() {
    const moduleName = this.get('moduleName');
    return this.$()[moduleName]('destroy');
  },

  execute() {
    const module = this.$()[this.get('moduleName')];
    return module.apply(this.$(), arguments);
  }
});

// Static properties to ignore
Semantic.BaseMixin.DEBUG = ['debug', 'performance', 'verbose'];
Semantic.BaseMixin.STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector'];
Semantic.BaseMixin.EMBER = ['context', 'on', 'template', 'execute'];

export default Semantic.BaseMixin;
