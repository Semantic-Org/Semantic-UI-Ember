import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';

export default Ember.Component.extend(CheckboxMixin, {
  type: 'radio',
  classNames: [ 'radio' ],
  name: 'default',

  init: function() {
    this._super();

    if (!(this.get('name') && this.get('name') !== 'default')) {
      Ember.Logger.warn('Name was not passed into semantic radio component');
    }
  },

  _onChange: function() {
    this.set('current', this.get('value'));
  },

  checked: Ember.computed(function() {
    return this.get('current') === this.get('value');
  })
});
