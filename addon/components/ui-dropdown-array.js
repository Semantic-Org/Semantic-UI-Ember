import Ember from 'ember';
import UiDropdown from 'semantic-ui-ember/components/ui-dropdown';

export default UiDropdown.extend({
  content: null,
  find_by: 'id',

  getSelected(selected) {
    return Ember.get(selected, this.get('find_by'));
  },

  updateProperty: function(property) {
    return function() {
      if (property === 'selected') {
        let value = this.get(`${property}.${this.get('find_by')}`);
        if (Ember.isBlank(value)) {
          this.execute('clear');
        } else {
          this.execute('set ' + property, value);
        }
      } else {
        this.execute('set ' + property, this.get(property));
      }
    };
  },

  _onChange: function(value, text, $element) {
    if (!$element) {
      return;
    }

    var record = this.get('content').find((item) => {
      var current = Ember.get(item, this.get('find_by'));
      return current === value || current.toString() === value || current === (value || '').toString();
    });
    this.set('selected', record);
  }
});
