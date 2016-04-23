import Ember from 'ember';
import Base from './base';

/*
 * Checkbox Component Mixin
 */
var CheckboxMixin = Ember.Mixin.create(Base, {
  module: 'checkbox',
  classNames: ['ui', 'checkbox'],
  classNameBindings: ['disabled:disabled']
});

export default CheckboxMixin;
