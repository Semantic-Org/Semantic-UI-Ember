import Ember from 'ember';
import CheckboxMixin from '../mixins/checkbox-mixin';

export default Ember.Component.extend(CheckboxMixin, {
  type: 'checkbox',
  ignorableAttrs: ['checked', 'label', 'disabled'],

  // Internal wrapper for onchange, to pass through checked
  _onChange() {
    let checked = this.execute('is checked');
    return this.attrs.onChange(checked, this);
  }
});
