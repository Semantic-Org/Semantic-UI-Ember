/* global alert */
import UiModal from 'semantic-ui-ember/components/ui-modal';

export default UiModal.extend({
  name: 'inbox',

  actions: {
    yes: function() {
      alert('yes');
      this.execute('hide');
    },

    no: function() {
      alert('no');
    }
  }
});
