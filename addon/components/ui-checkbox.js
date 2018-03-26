import Ember from 'ember';
import Checkbox from '../mixins/checkbox';
import layout from '../templates/components/ui-checkbox';

export default Ember.Component.extend(Checkbox, {
  layout,
  type: 'checkbox',
  ignorableAttrs: ['checked', 'label', 'disabled'],

  // Internal wrapper for onchange, to pass through checked
  _onChange() {
    let checked = this.execute('is checked');
    return this.attrs.onChange(checked, this);
  }
});
