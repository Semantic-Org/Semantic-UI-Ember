import Ember from 'ember';
import layout from '../templates/components/ui-dropdown';

export default Ember.Component.extend({
  layout: layout,
  computedCollection: Ember.computed('content', function () {
    var content = this.get('content');
    if(this.get('optionLabel') && this.get('optionValue')) {
      var optionLabel = this.get('optionLabel');
      var optionValue = this.get('optionValue');
      return content.map(item => {
        return {value: item[optionValue], label: item[optionLabel]};
      });
    } else {
      return content.map((item) => {
        return {value: item, label: item};
      });
    }
  }),
  actions: {
    change () {
      const selectedIndex = this.$('select')[0].selectedIndex;
      const content = this.get('content');
      const defaultBlank = this.get('defaultBlank');
      var selectedValue;
      if(defaultBlank) {
        selectedValue = content[selectedIndex - 1];
      } else {
        selectedValue = content[selectedIndex];
      }
      this.set('selectedValue', selectedValue);
      this.sendAction('onSelect', selectedValue);
    }
  }
});
