import Ember from 'ember';
import UiDropdown from 'semantic-ui-ember/components/ui-dropdown';

export default UiDropdown.extend({
  content: null,
  find_by: 'id',

  getSelected(selected) {
    if (Ember.isBlank(selected)) {
      return null;
    }
    return Ember.get(selected, this.get('find_by'));
  },

  _onChange: function(value, text, $element) {
    if (!$element) {
      return;
    }

    var record = this.get('content').find((item) => {
      var current = Ember.get(item, this.get('find_by'));
      return current === value || (current || '').toString() === value || current === (value || '').toString();
    });
    this.set('selected', record);
  }
});
