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
