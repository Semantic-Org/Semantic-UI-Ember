import Ember from 'ember';
import Base from '../mixins/base';

export default Ember.Mixin.create(Base, {
  module: 'modal',
  classNames: [ 'ui', 'modal' ],
  closable: false,
  transition: 'horizontal flip',

  setup: function() {
    this.set('hiding', false);
  }.on('init'),

  didInsertElement: function() {
    this._super();
    this.execute('show');
  },

  willDestroyElement: function() {
    this._super();
    if (!this.get('hiding')) {
      this.execute('hide');
    }
  },

  onHide: function() {
    this.set('hiding', true);
  },

  onHidden: function() {
    if (this.get('controller')) {
      this.get('controller').send('closeModal', this);
    }
  },

  onDeny: function() {
    var controller = this.checkControllerForAction('cancel');
    if (controller) {
      // if controller handles approves, they must manually call hideModal
      controller.send('cancel', this);
      return false
    }
    return true;
  },

  onApprove: function() {
    var controller = this.checkControllerForAction('approve');
    if (controller) {
      // if controller handles approves, they must manually call hideModal
      controller.send('approve', this);
      return false
    }
    return true;
  },

  checkControllerForAction: function(action) {
    var controller = this.get('controller');
    if (typeof controller !== "undefined" && controller !== null &&
        typeof controller._actions !== "undefined" && controller._actions !== null &&
        typeof controller._actions[action] !== "undefined" && controller._actions[action] !== null) {
      return controller;
    }
    return false
  }
});
