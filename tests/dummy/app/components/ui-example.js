import Ember from 'ember';

export default Ember.Component.extend({
  showing: false,
  copyCode: "",

  actions: {
    toggle() {
      this.toggleProperty("showing");
    },
    setCopyCode(code) {
      this.set('copyCode', code);
    }
  }

});
