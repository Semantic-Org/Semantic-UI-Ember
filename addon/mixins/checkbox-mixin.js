import Ember from 'ember';
import Base from './base';

/*
 * Checkbox Component Mixin
 */
var CheckboxMixin = Ember.Mixin.create(Base, {
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],

  layout: Ember.Handlebars.compile([
    '<input {{bind-attr type=type name=name checked=checked disabled=readonly data-id=data-id}} />',
    '<label>{{label}}</label>'
  ].join('\n')),

  didInsertElement: function() {
    if (this.get("disabled")) {
      return;
    }
    this._super();
  },

  willDestroyElement: function() {
    if (this.get("disabled")) {
      return;
    }
    this._super();
  }
});

export default CheckboxMixin;
