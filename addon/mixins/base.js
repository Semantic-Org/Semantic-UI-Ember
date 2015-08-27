import Ember from 'ember';
import Semantic from '../semantic';

Semantic.BaseMixin = Ember.Mixin.create({
  init: function() {
    this._super();

    if (!this.get('module')) {
      return Ember.Logger.error('Module was not declared on semantic extended type');
    }
  },

  settings: function(module) {
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

    for (key in component.settings) {
      console.log(key + ' for ' + module)
      prop = component.settings[key];
       if (window.$.inArray(key, Semantic.BaseMixin.DEBUG) >= 0) {
        continue;
      }

      if (window.$.inArray(key, Semantic.BaseMixin.STANDARD) >= 0) {
        continue;
      }

      if (typeof prop === 'function' && typeof this.get(key) !== 'function') {
        continue;
      }

      if (window.$.inArray(key, Semantic.BaseMixin.EMBER) >= 0) {
        value = this.get("ui_" + key);
      } else {
        value = this.get(key);
      }

      if (value != null) {
        if (typeof value === 'function') {
          custom[key] = Ember.run.bind(this, value);
        } else {
          custom[key] = value;
        }
      } else {
        if (key.startsWith('on') && key != 'on') {
          custom[key] = this.updateEvent(key);
        }
      }
    }

    return custom;
  },

  updateProperty: function(property) {
    return function() {
      this.execute('set ' + property, this.get(property));
    };
  },

  updateEvent: function(name) {
    return function() {
      return this.sendAction(name, arguments);
    }
  },

  didInsertElement: function() {
    this.$()[this.get("module")](this.settings(this.get("module")));

    var _this = this;
    var properties = this.execute('set');
    var property;

    for(property in properties) {
      if (!properties.hasOwnProperty(property)) {
        continue;
      }

      _this.addObserver(property, _this, _this.updateProperty(property));
    }
  },

  willDestroyElement: function() {
    var name, selector;
    if ((selector = this.$()) != null) {
      if (typeof selector[name = this.get("module")] === "function") {
        return selector[name]('destroy');
      }
    }
  },

  execute: function() {
    var selector, module;
    if ((selector = this.$()) != null) {
      if ((module = selector[this.get('module')]) != null) {
        return module.apply(this.$(), arguments);
      }
    }
  }
});

// Static properties to ignore
Semantic.BaseMixin.DEBUG = ['debug', 'performance', 'verbose'];
Semantic.BaseMixin.STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector'];
Semantic.BaseMixin.EMBER = ['context', 'on', 'template', 'execute'];

export default Semantic.BaseMixin;
