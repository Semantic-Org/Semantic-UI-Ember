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
    Ember.assert("Semantic modal was destoryed without being properly hidden. Don't call closeModal from the controller. Instead add an approve or deny action, and then call view.execute('hide') from the view passed in.", this.get('hiding'));  
  },

  onHide: function() {
    this.set('hiding', true);
    var controller = this.checkControllerForAction('hide');
    if (controller) {
      // we don't pass in view, since you can't stop it from hiding once it starts
      controller.send('hide');
    }
  },

  onHidden: function() {
    if (this.get('controller')) {
      this.get('controller').send('closeModal');
    }
  },

  onDeny: function() {
    var controller = this.checkControllerForAction('deny');
    if (controller) {
      // if controller handles approves, they must manually call view.execute('hide')
      controller.send('deny', this);
      return false
    }
    return true;
  },

  onApprove: function() {
    var controller = this.checkControllerForAction('approve');
    if (controller) {
      // if controller handles approves, they must manually call view.execute('hide')
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
