import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';
import layout from '../templates/components/ui-checkbox';

export default Ember.Component.extend(CheckboxMixin, {
  type: 'checkbox',
  checked: false,
  layout: layout,

  onChange: function() {
    this.set('checked', this.$('input').prop('checked'));
    this.sendAction('action', {
      checked: this.get('checked'),
      value: this.get('value')
    });
  }
});
