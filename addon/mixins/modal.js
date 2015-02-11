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

  showOnInsert: function() {
    this.execute('show');
  }.on('didInsertElement'),

  hideOnDestroy: function() {
    if (!this.get('hiding')) {
      this.execute('hide');
    }
  }.on('willDestroyElement'),

  onHide: function() {
    this.set('hiding', true);
    if (this.get('controller')) {
      this.get('controller').send('closeModal');
    }
    return false;
  },

  onDeny: function() {
    if (this.get('controller')._actions['cancel'] !== null &&
        this.get('controller')._actions['cancel'] !== undefined) {
      this.get('controller').send('cancel');
    }
    return true;
  },

  onApprove: function() {
    if (this.get('controller')._actions['approve'] !== null &&
        this.get('controller')._actions['approve'] !== undefined) {
      this.get('controller').send('approve');
    }
    return false;
  }
});
