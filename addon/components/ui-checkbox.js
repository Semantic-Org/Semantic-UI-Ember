import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';

export default Ember.Component.extend(CheckboxMixin, {
  type: 'checkbox',

  _onChange: function() {
    this.set('checked', this.$('input').prop('checked'));
  }
});
