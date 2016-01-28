import Ember from 'ember';
import UiDropdown from 'semantic-ui-ember/components/ui-dropdown';

export default UiDropdown.extend({
  content: null,
  find_by: 'id',

  initialize: Ember.on('didInsertElement', function() {
    var selected = this.get('selected');
    if (typeof selected !== "undefined" && selected !== null) {
      this.set('boundValue', 'selected');
      this.execute('set selected', Ember.get(selected, this.get('find_by')));
    }

    var value = this.get('value');
    if (typeof value !== "undefined" && value !== null) {
      Ember.deprecate('Bind to selected on ui-dropdown instead of value as semantic doesn\'t update the display when the value is set', false);
      this.set('boundValue', 'value');
      this.execute('set value', Ember.get(value, this.get('find_by')));
    }
  }),

  updateProperty: function(property) {
    return function() {
      if (property === 'selected') {
        this.execute('set ' + property, this.get(`${property}.${this.get('find_by')}`));
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
      return current === value || current.toString() === value;
    });
    this.set(this.get('boundValue') || 'selected', record);
  }
});
