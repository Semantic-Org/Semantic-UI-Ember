import Ember from 'ember';
import Semantic from '../semantic';

var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Semantic.BaseMixin = Ember.Mixin.create({
  init: function() {
    this._super();
    if (!this.get('module')) {
      return Ember.Logger.error('Module was not declared on semantic extended type');
    }
  },
  settings: function(module) {
    var component, custom, key, prop, value, _ref;
    component = $.fn[module];
    if (!component) {
      throw "Unable to find semantic module: " + module;
    }
    custom = {
      debug: Semantic.UI_DEBUG,
      performance: Semantic.UI_PERFORMANCE,
      verbose: Semantic.UI_VERBOSE
    };
    _ref = component.settings;
    for (key in _ref) {
      prop = _ref[key];
      if (__indexOf.call(Semantic.BaseMixin.DEBUG, key) >= 0) {
        continue;
      }
      if (__indexOf.call(Semantic.BaseMixin.STANDARD, key) >= 0) {
        continue;
      }
      if (typeof prop === 'function' && typeof this.get(key) !== 'function') {
        continue;
      }
      if (__indexOf.call(Semantic.BaseMixin.EMBER, key) >= 0) {
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
      }
    }
    return custom;
  },
  didInsertElement: function() {
    return this.$()[this.get("module")](this.settings(this.get("module")));
  },
  willDestroyElement: function() {
    var _name, _ref;
    return (_ref = this.$()) != null ? typeof _ref[_name = this.get("module")] === "function" ? _ref[_name]('destroy') : void 0 : void 0;
  },
  execute: function() {
    var _ref, _ref1;
    return (_ref = this.$()) != null ? (_ref1 = _ref[this.get('module')]) != null ? _ref1.apply(this.$(), arguments) : void 0 : void 0;
  }
});

// Static properties to ignore
Semantic.BaseMixin.DEBUG = ['debug', 'performance', 'verbose'];
Semantic.BaseMixin.STANDARD = ['name', 'namespace', 'className', 'error', 'metadata', 'selector'];
Semantic.BaseMixin.EMBER = ['context', 'on', 'template', 'execute'];

export default Semantic.BaseMixin;
