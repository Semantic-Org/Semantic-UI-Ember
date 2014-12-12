import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';

var CheckboxComponent = Ember.Component.extend(CheckboxMixin, {
  type: 'checkbox',
  checked: false,

  onChange: function() {
    this.set('checked', this.$('input').prop('checked'));
    this.sendAction("action", {
      checked: this.get('checked'),
      value: this.get('value')
    });
  }
});

export default CheckboxComponent;
